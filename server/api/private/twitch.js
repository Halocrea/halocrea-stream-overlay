import { promises as fs } from 'fs'
import axios              from 'axios'
import cookieParser       from 'cookie-parser'
import express            from 'express'
import jwt                from 'express-jwt'

import { getAppAccessTokens, getUserInfo, refreshToken } from '../../utils/_twitchUtils'
import updateConfig                                      from '../../utils/_configUpdater'

require('dotenv').config()
const cors = require('cors')

// Create app
const app = express()

// Install middleware
app.use(cookieParser())

// JWT middleware
app.use(
	jwt({
		secret: process.env.JWT_SECRET,
		algorithms: ['sha1', 'RS256', 'HS256']
	})
)

const setAppAccessTokens = async () => {
	try {
		const { data } = await axios.post(
			`https://id.twitch.tv/oauth2/token?client_id=${
				process.env.TWITCH_CLIENT_ID
			}&client_secret=${
				process.env.TWITCH_CLIENT_SECRET
			}&grant_type=client_credentials`
		)

		data.expires_in = new Date(new Date().setSeconds(data.expires_in)).toISOString()
		await fs.writeFile('data/app-access-token.json', JSON.stringify(data), { encoding: 'utf8' })
		return data
	} catch (e) {
		console.warn('Could not get an app access token')
		return null
	}
}

// check and update if necessary the subscriptions to the Twitch's webhooks we need
// topics we subscribe to are:
//     - stream (to be alerted whenever the stream starts)
//     - follow (whenever someone follows the channel)
// We need to use the hooks for these because we can't get a real-time update on this otherwise, which sucks.
// webhooks won't work if you're running this locally
// https://dev.twitch.tv/docs/api/webhooks-reference/#subscribe-tounsubscribe-from-events
app.get('/webhooks', cors(), async (req, res) => {
	const subscriptions   = []
	const callbackBaseUri = process.env.NGROK_URL || process.env.BASE_URL
	let tokens            = await getAppAccessTokens()
	const userInfo        = await getUserInfo()

	// if we never got an app access token, we need to try and get one
	// only if the .env file has been properly set
	if (process.env.TWITCH_CLIENT_ID && process.env.TWITCH_CLIENT_SECRET && !tokens)
		tokens = await setAppAccessTokens()
	else if (tokens && tokens.expires_in && tokens.refresh_token) { // we can preemptively check if we need to refresh
		const expiry    = new Date(tokens.expires_in)
		const checkDate = new Date()
		checkDate.setHours(checkDate.getHours() - 1)
		if (expiry <= checkDate) {
			const res = await refreshToken('app', tokens.refresh_token)
			if (res)
				tokens = await getAppAccessTokens()
		}
	} else if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
		await updateConfig(['showLatestFollow', 'showLatestSub'], [false, false])
		return res.status(420).send('Cannot use Twitch features without the Client ID nor the Client Secret. Please check the Readme to make sure you set things properly.')
	} else if (tokens && tokens.access_token && !tokens.refresh_token) { // for some reason, we have an access token but not a refresh token, so if it is expired or about to expire we need to change it
		const expiry    = new Date(tokens.expires_in)
		const checkDate = new Date()
		checkDate.setHours(checkDate.getHours() - 6)
		if (expiry <= checkDate)
			tokens = await setAppAccessTokens()
	}

	try {
		// 1. Get active subscriptions
		const { data } = await axios({
			method: 'GET',
			url: 'https://api.twitch.tv/helix/webhooks/subscriptions?first=10',
			headers: {
				'Client-ID'  : process.env.TWITCH_CLIENT_ID,
				Authorization: `Bearer ${tokens.access_token}`
			}
		})
		// 2. if a webhook subscription to /users/follows?first=1&to_id=<TWITCH_CHANNEL_ID> or /streams?user_id=<TWITCH_CHANNEL_ID> is missing or expired, subscribe to id
		data.data.forEach((s) => {
			if (s.topic.includes(`/helix/streams?user_id=${userInfo.user_id}`) &&
				s.callback.includes(`${callbackBaseUri}/api/public-twitch/stream-state-changed`) &&
				new Date(s.expires_at) > new Date()
			)
				subscriptions.push({ topic: 'stream', url: s.topic })
			else if (s.topic.includes(`/helix/users/follows?first=1&to_id=${userInfo.user_id}`) &&
				s.callback.includes(`${callbackBaseUri}/api/public-twitch/new-follower`) &&
				new Date(s.expires_at) > new Date()
			)
				subscriptions.push({ topic: 'follow', url: s.topic })
		})
	} catch (err) {
		console.warn('could not fetch webhook subscriptions: `' + err + '`')
	}

	try {
		if (subscriptions.find(s => s.topic === 'stream')) {
			await axios
				.post('https://api.twitch.tv/helix/webhooks/hub', {
					'hub.callback'     : `${callbackBaseUri}/api/public-twitch/stream-state-changed`,
					'hub.mode'         : 'subscribe',
					'hub.topic'        : `https://api.twitch.tv/helix/streams?user_id=${userInfo.user_id}`,
					'hub.lease_seconds': 864000
					// should implement de hub.secret but not sure how to do so just yet
				}, {
					headers: {
						'Client-ID'  : process.env.TWITCH_CLIENT_ID,
						Authorization: `Bearer ${tokens.access_token}`
					}
				})
		}
		if (subscriptions.find(s => s.topic === 'follow')) {
			await axios
				.post('https://api.twitch.tv/helix/webhooks/hub', {
					'hub.callback'     : `${callbackBaseUri}/api/public-twitch/new-follower`,
					'hub.mode'         : 'subscribe',
					'hub.topic'        : `https://api.twitch.tv/helix/users/follows?first=1&to_id=${userInfo.user_id}`,
					'hub.lease_seconds': 864000
					// should implement de hub.secret but not sure how to do so just yet
				}, {
					headers: {
						'Client-ID'  : process.env.TWITCH_CLIENT_ID,
						Authorization: `Bearer ${tokens.access_token}`
					}
				})
		}
	} catch (err) {
		console.warn('could not subscribe to webhooks: `' + err + '`')
	}
	res.send('OK')
})

// Error handler
app.use((err, _req, res, next) => {
	console.log('error in /api/private-twitch')
	console.log(err)
	res.status(401).send(err + '')
})

// -- export app --
export default {
	path: '/api/private-twitch',
	handler: app
}
