import { getUserAccessTokens, getUserInfo } from '../utils/_twitchUtils'
import { subs }                             from '../io'

process.TMI_CLIENT_CONSTANT = null

export const getTmiClient = async () => {
	const userInfo  = await getUserInfo()

	if (!userInfo)
		return

	try {
		if (!process.TMI_CLIENT_CONSTANT)
			process.TMI_CLIENT_CONSTANT = await bootTmiClient()
	} catch (e) {
		console.log(e)
		console.warn('Could not get the TMI Client to boot properly.')
	}
	return process.TMI_CLIENT_CONSTANT
}

// Note: TMI requires a user access token
export const bootTmiClient = async () => {
	const tmi       = require('tmi.js')
	const tokens    = await getUserAccessTokens()
	const userInfo  = await getUserInfo()
	const options   = {
		options   : { debug: false },
		connection: {
			reconnect: true,
			secure   : true
		},
		identity: {
			username: userInfo.login,
			password: `oauth:${tokens.access_token}`
		},
		channels: [userInfo.login]
	}
	const client = new tmi.Client(options)
	_initEvents(client)

	return client
}

const _initEvents = (client) => {
	const events = {
		// connected   : (address, port) => {},
		// connecting  : (address, port) => {},
		cheer: (channel, userstate, message) => {
			subs.forEach(s =>
				s.emit('twitchBitsAlert', {
					bits        : userstate.bits,
					color       : userstate.color,
					display_name: userstate.username,
					username    : userstate.username
				})
			)
		},
		hosted: (channel, username, viewers, autohost) => {
			subs.forEach(s =>
				s.emit('twitchHostAlert', {
					host: username,
					viewers
				})
			)
		},
		// for debug purposes... mostly
		// message: (channel, userstate, message, self) => {
		// 	if (self || userstate['message-type'] !== 'chat')
		// 		return
		// 	const obj = {
		// 		color   : userstate.color,
		// 		username: userstate['display-name'],
		// 		message
		// 	}
		// 	console.log(`[debug] chat message from ${obj.username}: ${obj.message}`)
		// 	subs.forEach(s => s.emit('twitchChatMessage', obj))
		// },
		raided: (channel, username, viewers) => {
			subs.forEach(s => s.emit('twitchRaidAlert', {
				host: username,
				viewers
			}))
		},
		resub: (channel, username, months, message, userstate, methods) => {
			const obj = {
				color           : userstate.color,
				display_name    : username,
				cumulativeMonths: ~~userstate['msg-param-cumulative-months'],
				username
			}
			subs.forEach(s => s.emit('twitchResubAlert', obj))
		},
		subgift: (channel, username, streakMonths, recipient, methods, userstate) => {
			const obj = {
				sender          : username,
				display_name    : recipient,
				senderCount     : ~~userstate['msg-param-sender-count'],
				username        : recipient
			}
			subs.forEach(s => s.emit('twitchSubgiftAlert', obj))
		},
		subscription : (channel, username, method, message, userstate) => {
			const obj = {
				color           : userstate.color,
				display_name    : username,
				username
			}
			subs.forEach(s => s.emit('twitchSubAlert', obj))
		}
	}

	for (const e in events)
		client.on(e, events[e])

	client.connect().catch(console.warn)
}
