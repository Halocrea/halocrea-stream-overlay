import { promises as fs } from 'fs'
import axios              from 'axios'
import express            from 'express'

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
const tokensFilePath = 'data/token.json'
const refreshToken   = async (token) => {
	const { data } = await axios.post(
		`https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${
			token
		}&client_id=${
			process.env.TWITCH_CLIENT_ID
		}&client_secret=${
			process.env.TWITCH_CLIENT_SECRET
		}`
	)
	data.expires_in = new Date(new Date().setSeconds(data.expires_in)).toISOString()
	await fs.writeFile((tokensFilePath, JSON.stringify(data), { encoding: 'utf8' }))
}

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
				await refreshToken(tokens.refresh_token)
			}

			res.status(200).send('OK')
		} else { // if needs to be refreshed
			await refreshToken(tokens.refresh_token)
			res.status(200).send('OK')
		}
	} catch (e) {
		// file does not exists or tokens could not be validated nor refreshed
		res.status(401).send('must authorize')
	}
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
