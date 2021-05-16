import updateConfig         from '../utils/_configUpdater'
import { getDiscordClient } from '../discord/discordClient'

export default function (subs) {
	const getGuildMemberDetails = (member) => {
		try {
			const roleColor = !member.roles.color ? 'ffffff' : member.roles.color.color.toString(16)
			return {
				avatarURL  : member.user.avatarURL({ format: 'jpg', dynamic: true, size: 64 }),
				color      : roleColor,
				displayName: member.displayName,
				speaking   : false,
				userID     : member.id
			}
		} catch (err) {
			console.warn(`in io/SocketController.js#getGuildMemberDetails: ${err.message}`)
			return {
				avatarURL  : '',
				color      : '000000',
				displayName: member.displayName,
				speaking   : false,
				userID     : member.id
			}
		}
	}

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

					const member = getGuildMemberDetails(m)
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
