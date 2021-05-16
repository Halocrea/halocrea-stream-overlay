import cookieParser from 'cookie-parser'
import express      from 'express'
import jwt          from 'express-jwt'

import { getDiscordClient } from '../discord/discordClient'

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

// fetching the list of channels in our Discord guild
app.get('/channels', cors(), async (req, res) => {
	const discordClient = getDiscordClient()
	const guild         = await discordClient.guilds.fetch(process.env.DISCORD_GUILD)
	const voiceChannels = guild.channels.cache.reduce((acc, current) => {
		if (current.type === 'voice') {
			acc.push({
				id     : current.id,
				members: current.members,
				name   : current.name
			})
		}
		return acc
	}, [])
	res.status(200).json({ status: 'success', data: voiceChannels })
})

// to fetch the info of a specific Discord channel
// this should be used only in very specific cases
// such as the bot joined a channel that was just created and is not in Discord API's cache yet
app.get('/channel/:id', cors(), async ({ params }, res) => {
	const discordClient = getDiscordClient()
	const guild         = await discordClient.guilds.fetch(process.env.DISCORD_GUILD)
	const channel       = guild.channels.resolve(params.id)
	if (channel)
		res.status(200).json({ status: 'success', data: channel })
	else
		res.status(404).send('Cannot find the channel (maybe a Discord cache issue)')
})

// Error handler
app.use((err, _req, res, next) => {
	console.log('error in /api/private-config')
	console.log(err)
	res.status(401).send(err + '')
})

// -- export app --
export default {
	path: '/api/private-discord',
	handler: app
}
