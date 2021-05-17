// this is a client-only plugin
// it'll setup the socket event watchers for discord
// to update the "current voice channel" and its members
const watchDiscordEvents = ({ $root, store, $axios }) => {
	let botChannel = store.state.config.discordBotChannel // just for easier access
	$root.mainSocket.on('discordUserJoined', ({ id, member }) => {
		// need to check if the user just 'moved' from our channel to another
		// because in that case there's not 'discordUserLeave' before this join event

		const botChannelInfos = store.state.discord.infos
		if (!botChannelInfos.members) return // if for whatever reason we're not synced yet

		const tmpMembers = JSON.parse(JSON.stringify(botChannelInfos.members)) // deepcopy

		if (id === botChannel && !botChannelInfos.members.find(m => m.userID === member.userID)) {
			tmpMembers.push(member)
			store.commit('discord/setInfos', {
				channel: botChannelInfos.channel,
				members: tmpMembers
			})
		} else if (id !== botChannel) {
			const idx = botChannelInfos.members.findIndex(m => m.userID === member.userID)
			if (idx >= 0) { // if user moved from out voice channel to another one
				tmpMembers.splice(idx, 1)
				store.commit('discord/setInfos', {
					channel: botChannelInfos.channel,
					members: tmpMembers
				})
			}
		}
	})

	$root.mainSocket.on('discordUserLeave', ({ id, member }) => {
		if (id !== botChannel) return // we only care if it's related to the voice chan we watch

		const botChannelInfos = store.state.discord.infos
		if (!botChannelInfos.members) return // if for whatever reason we're not synced yet

		const tmpMembers = JSON.parse(JSON.stringify(botChannelInfos.members)) // deepcopy
		const idx = botChannelInfos.members.findIndex(m => m.userID === member.userID)
		if (idx >= 0) {
			tmpMembers.splice(idx, 1)
			store.commit('discord/setInfos', {
				channel: botChannelInfos.channel,
				members: tmpMembers
			})
		}
	})

	$root.mainSocket.on('configUpdated', async ({ discordBotChannel }) => {
		if (botChannel === discordBotChannel) return

		botChannel = discordBotChannel
		try {
			const { data } = await $axios.get('/api/public-discord/voice-info', {
				progress: false
			})
			if (data.status === 'success' && data.data)
				store.commit('discord/setInfos', data.data)
		} catch (e) {
			store.commit('discord/clearInfos')
		}
	})
}

export default function ({ store, app: { $axios } }) {
	if (typeof window === 'undefined') return // likely an unnecessary failsafe

	window.onNuxtReady(() => {
		if (window.$nuxt.$root.mainSocket)
			watchDiscordEvents({ $axios, store, $root: window.$nuxt.$root })
		else {
			window.$nuxt.$root.$on('mainSocketInit', () =>
				watchDiscordEvents({ $axios, store, $root: window.$nuxt.$root })
			)
		}
	})
}
