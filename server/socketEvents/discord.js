import updateConfig              from '../utils/_configUpdater'
import { getDiscordClient }      from '../discord/discordClient'
import { setGuildMemberDetails } from '../utils/_setGuildMemberDetails'

export default function (subs) {
	return {
		// for the bot to join a given voice channel
		async discordJoinChannel (id) {
			try {
				const client    = getDiscordClient()
				const guild     = await client.guilds.cache.get(process.env.DISCORD_GUILD)
				const voiceChan = await guild.channels.cache.get(id)
				await voiceChan.join()

				const members = []
				voiceChan.members.forEach((m) => {
					if (m.id === client.user.id) return

					const member = setGuildMemberDetails(m)
					members.push(member)
				})

				subs.forEach(s =>
					s.emit('discordBotJoinedChannel', {
						channel: voiceChan,
						members
					})
				)

				const config = await updateConfig('discordBotChannel', id)
				if (!config)
					return { status: 'error' }
				subs.forEach(s => s.emit('configUpdated', config))

				return { status: 'ok', config }
			} catch (err) {
				console.warn(err)
				return { status: 'error' }
			}
		},

		// for the bot to leave a given channel
		async discordLeaveChannel () {
			try {
				const client        = getDiscordClient()
				const guild         = await client.guilds.cache.get(process.env.DISCORD_GUILD)
				const botMemberUser = await guild.members.fetch(client.user.id)
				const voiceChannel  = await guild.channels.cache.get(botMemberUser.voice.channelID)
				voiceChannel.leave()
				subs.forEach(s => s.emit('discordBotLeftChannel'))

				const updatedConf = await updateConfig('discordBotChannel', '')
				if (!updatedConf)
					return { status: 'error' }
				subs.forEach(s => s.emit('configUpdated', updatedConf))

				return { status: 'ok', updatedConf }
			} catch (err) {
				console.warn(err)
				return { status: 'error' }
			}
		}
	}
}
