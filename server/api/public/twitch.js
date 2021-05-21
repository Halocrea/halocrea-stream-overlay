import { promises as fs } from 'fs'
import axios              from 'axios'
import express            from 'express'

import { getUserAccessTokens, getUserInfo, refreshToken } from '../../utils/_twitchUtils'

require('dotenv').config()

const crypto = require('crypto')
const cors   = require('cors')
const verify = (req, res, buf, encoding) => {
	const expected   = req.headers['x-hub-signature']
	const calculated = 'sha256=' + crypto.createHmac('sha256', process.env.TWITCH_CLIENT_SECRET).update(buf).digest('hex')
	req.verified = expected === calculated
}

// Create app
const app            = express()
const tokensFilePath = 'data/user-access-token.json'
app.use(express.json({ verify }))

// This is used to check if we have access tokens to Twitch and/or if we need to re-authorize/refresh
// https://dev.twitch.tv/docs/authentication#validating-requests
app.get('/validate', cors(), async (req, res) => {
	// checking if the token file exists
	try {
		await fs.access(tokensFilePath)
		// file exists
		const tokens    = JSON.parse(await fs.readFile(tokensFilePath, { encoding:'utf8' }))
		// checking if the tokens are still valid for the next 12 hours
		const expiry    = new Date(tokens.expires_in)
		const checkDate = new Date()
		checkDate.setHours(checkDate.getHours() + 1)
		if (expiry > checkDate) { // if is OK
			try {
				await axios.get('https://id.twitch.tv/oauth2/validate', {
					headers: {
						Authorization: `OAuth ${tokens.access_token}`
					}
				})
			} catch (e) { // if for some reason token was invalidated we can try to refresh it
				console.warn(e)
				await refreshToken('user', tokens.refresh_token)
			}

			res.status(200).send('OK')
		} else { // if needs to be refreshed
			await refreshToken('user', tokens.refresh_token)
			res.status(200).send('OK')
		}
	} catch (e) {
		// file does not exists or tokens could not be validated nor refreshed
		res.status(401).send('must authorize')
	}
})

// fetching the latest follower and latest subscriber
app.get('/latest-follow-sub', cors(), async (req, res) => {
	let follower
	const tokens      = await getUserAccessTokens()
	const userInfo    = await getUserInfo()

	// https://dev.twitch.tv/docs/v5/reference/channels#get-channel-followers
	// Using Kraken (v5) instead of Helix because Helix doesn't have query parameters to get only latest
	const followerUri = `https://api.twitch.tv/kraken/channels/${userInfo.user_id}/follows?direction=desc&limit=1`
	try {
		const { data } = await axios({
			method : 'GET',
			url    : followerUri,
			headers: {
				Accept       : 'application/vnd.twitchtv.v5+json',
				Authorization: `OAuth ${tokens.access_token}`
			}
		})
		if (data.follows.length > 0) // if we have at least one follower in the returned list
			follower = data.follows[0].user
	} catch (err) {
		console.warn('Error in `api/private-twitch.js#get("/latest-follow-sub")` while trying to get the follower: `' + err + '`')
	}

	let subscriber
	// https://dev.twitch.tv/docs/v5/reference/channels#get-channel-subscribers
	// Using Kraken (v5) instead of Helix because Helix doesn't have query parameters to get only latest
	const subscriberUri = `https://api.twitch.tv/kraken/channels/${userInfo.user_id}/subscriptions?direction=desc&limit=1`

	try {
		const { data } = await axios({
			url    : subscriberUri,
			method : 'GET',
			headers: {
				Accept       : 'application/vnd.twitchtv.v5+json',
				Authorization: `OAuth ${tokens.access_token}`
			}
		})
		if (data.subscriptions.length > 0) // if we have at least one subscriber in the returned list
			subscriber = data.subscriptions[0].user
	} catch (err) {
		console.warn('Error in `api/private-twitch.js#get("/latest-follow-sub")` while trying to get the subscriber: `' + err + '`')
	}

	res.json({
		follower,
		subscriber
	})
})

// endpoint only for the webhook's challenge with topic 'follow'
// https://dev.twitch.tv/docs/api/webhooks-guide
app.get('/new-follower', cors(), (req, res) => {
	res.status(200).end(req.query['hub.challenge'])
})
// endpoint for the webhook with topic 'follow'
// https://dev.twitch.tv/docs/api/webhooks-guide
app.post('/new-follower', cors(), (req, res) => {
	if (req.body && req.body.data && req.body.data.length > 0)
		console.log('TBD new follower')

	res.status(200).end(req.query['hub.challenge'])
})

// endpoint only for the webhook's challenge with topic 'stream'
// https://dev.twitch.tv/docs/api/webhooks-guide
app.get('/stream-state-changed', cors(), (req, res) => {
	res.status(200).end(req.query['hub.challenge'])
})

// endpoint for the webhook with topic 'stream'
// https://dev.twitch.tv/docs/api/webhooks-guide
app.post('/stream-state-changed', cors(), (req, res) => {
	if (req.body && req.body.data && req.body.data.length > 0)
		console.log('TBD stream started')
	else
		console.log('TBD stream ended')

	res.status(200).end(req.query['hub.challenge'])
})

// Error handler
app.use((err, _req, res, next) => {
	console.log('error in /api/public-twitch')
	console.log(err)
	res.status(401).send(err + '')
})

// -- export app --
export default {
	path: '/api/public-twitch',
	handler: app
}
