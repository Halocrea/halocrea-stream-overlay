import jsonwebtoken from 'jsonwebtoken'
import config       from './socketEvents/config'
import discord      from './socketEvents/discord'

import bootDiscordClient, { getDiscordClient } from './discord/discordClient'

require('dotenv').config()

export const subs = []

bootDiscordClient(getDiscordClient())

export default function (socket, io) {
	let authenticated = false
	if (socket.handshake.auth.token && socket.handshake.auth.token.includes(' ')) {
		try {
			authenticated = jsonwebtoken.verify(socket.handshake.auth.token.split(' ')[1], process.env.JWT_SECRET)
		} catch (err) {}
	}

	subs.push(socket)

	socket.on('disconnect', () => {
		const idx = subs.findIndex(s => s.id === socket.id)
		if (idx >= 0)
			subs.splice(idx, 1)
	})

	let namespaces = {}
	if (authenticated) {
		namespaces = Object.assign(namespaces, {
			...config(subs),
			...discord(subs)
		})
	}

	return Object.freeze(namespaces)
}
