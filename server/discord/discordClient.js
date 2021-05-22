import { Client }                from 'discord.js'
import { subs }                  from '../io'
import updateConfig              from '../utils/_configUpdater'
import { setGuildMemberDetails } from '../utils/_setGuildMemberDetails'

process.DISCORD_CLIENT_CONSTANT = null

export function getDiscordClient () {
	if (!process.DISCORD_CLIENT_CONSTANT)
		process.DISCORD_CLIENT_CONSTANT = new Client()

	return process.DISCORD_CLIENT_CONSTANT
}

export default function (client) {
	// Whenever a channel is created, if it's a voice chan, we need to update the channels list
	client.on('channelCreate', ({ id, guild, members, name, type }) => {
		if (!guild || guild.id !== process.env.DISCORD_GUILD) return

		if (type !== 'voice') return
		subs.forEach(s => s.emit('discordNewVoiceChan', { id, members, name }))
	})

	// Whenever a channel is deleted, if it's a voice chan, we need to update the channels list
	client.on('channelDelete', ({ guild, type, id }) => {
		if (!guild || guild.id !== process.env.DISCORD_GUILD) return

		if (type !== 'voice') return
		subs.forEach(s => s.emit('discordVoiceChanRemoved', { id }))
	})

	// Whenever a channel has been updated, if it's a voice chan, we need to update it in the channels list
	client.on('channelUpdate', (old, { id, guild, name, type }) => {
		if (!guild || guild.id !== process.env.DISCORD_GUILD) return

		if (type !== 'voice') return
		subs.forEach(s => s.emit('discordVoiceChanUpdated', { id, name }))
	})

	// Whenever someone joins or leave a voice channel
	client.on('voiceStateUpdate', async (oldState, newState) => {
		if (!newState.guild || newState.guild.id !== process.env.DISCORD_GUILD) return

		if (newState.channelID) { // joins
			if (newState.id === client.user.id) {
				const config = await updateConfig('discordBotChannel', newState.id)
				subs.forEach(s => s.emit('configUpdated', config))
			}
			const guild  = await client.guilds.fetch(process.env.DISCORD_GUILD)
			const member = await guild.members.fetch(newState.id)
			subs.forEach(s => s.emit('discordUserJoined', {
				id: newState.channelID,
				member: setGuildMemberDetails(member)
			}))
		} else { // leave
			if (oldState.id === client.user.id) {
				const config = await updateConfig('discordBotChannel', '')
				subs.forEach(s => s.emit('configUpdated', config))
			}
			subs.forEach(s => s.emit('discordUserLeave', {
				id    : oldState.channelID,
				member: { userID: oldState.id }
			}))
		}
	})

	client.login(process.env.DISCORD_TOKEN)
}
