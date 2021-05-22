import cookieParser from 'cookie-parser'
import express      from 'express'
import jwt          from 'express-jwt'

import { subs }             from '../../io'
import { getDiscordClient } from '../../discord/discordClient'
import updateConfig         from '../../utils/_configUpdater'

require('dotenv').config()

const cors = require('cors')
const app  = express()

// Install middleware
app.use(express.json())
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
app.get('/channel/:id', cors(), async ({ params }, res) => {
	const discordClient = getDiscordClient()
	const guild         = await discordClient.guilds.fetch(process.env.DISCORD_GUILD)
	const channel       = guild.channels.resolve(params.id)
	if (channel)
		res.status(200).json({ status: 'success', data: channel })
	else
		res.status(404).send('Cannot find the channel (maybe a Discord cache issue)')
})

// set the title for the voice chat
app.post('/title', cors(), async ({ body }, res) => {
	let title = body.title
	if (!title) // we need a default name to display
		title = 'Voice Chat'
	try {
		const updatedConfig = await updateConfig('voiceChatTitle', title)
		if (!updatedConfig) // an error occured
			return res.status(500).send('Could not update the voice chat\'s title')

		subs.forEach(s => s.emit('configUpdated', updatedConfig))
		res.status(200).json(updatedConfig)
	} catch (e) {
		res.status(500).send('Could not update the voice chat\'s title')
	}
})

// Error handler
app.use((err, _req, res, next) => {
	console.log('error in /api/private-discord')
	console.log(err)
	res.status(401).send(err + '')
})

// -- export app --
export default {
	path: '/api/private-discord',
	handler: app
}
