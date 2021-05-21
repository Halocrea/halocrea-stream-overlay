import { promises as fs } from 'fs'
import express            from 'express'

import { getDiscordClient }      from '../../discord/discordClient'
import { setGuildMemberDetails } from '../../utils/_setGuildMemberDetails'

const cors               = require('cors')
const app                = express()
const userConfigFilePath = 'data/user-config.json'

// fetch users in a voice channel
app.get('/voice-info', cors(), async (req, res) => {
	const configRaw     = await fs.readFile(userConfigFilePath, { encoding: 'utf8' })
	const config        = JSON.parse(configRaw)

	if (!config.discordBotChannel) // if the bot is not into a voice chat
		return res.status(200).json({ status: 'success', data: {} })

	const discordClient = getDiscordClient()
	const guild         = await discordClient.guilds.fetch(process.env.DISCORD_GUILD)
	const channel       = guild.channels.cache.get(config.discordBotChannel)

	const members       = []
	if (!channel || !channel.members) // sometimes channel is undefined for a reason I don't know
		return res.status(200).json({ status: 'success', data: {} })

	channel.members.forEach((m) => {
		if (m.id === discordClient.user.id) return

		const member = setGuildMemberDetails(m)
		members.push(member)
	})

	res.status(200).json({ status: 'success', data: { channel, members } })
})

// Error handler
app.use((err, _req, res, next) => {
	console.log('error in /api/public-discord')
	console.log(err)
	res.status(401).send(err + '')
})

// -- export app --
export default {
	path: '/api/public-discord',
	handler: app
}
