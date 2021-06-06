import { mapGetters } from 'vuex'
import Checkbox       from '~/components/utils/form/Checkbox.vue'
import CustomSelect   from '~/components/layout/CustomSelect/CustomSelect.vue'

export default {
	components: {
		Checkbox,
		CustomSelect
	},

	data () {
		return {
			channels: [],
			error   : false,
			filter  : false
		}
	},

	computed: {
		options () {
			if (this.channels.length < 1)
				return [{ key: '', label: '' }]

			return this.channels.reduce((acc, current) => {
				if (this.filter && current.members.length < 1)
					return acc

				acc.push({
					key  : current.id,
					label: `${current.name} (${current.members ? current.members.length : '(?)'})`
				})
				return acc
			}, [{ key: 'default', label: this.$t('components.admin.discord.channelSelect.selectAChan') }])
		},

		...mapGetters({
			discordBotChannel: 'config/discordBotChannel'
		})
	},

	watch: {
		discordBotChannel: {
			immediate: true,
			async handler (val) {
				if (val && !this.channels.find(c => c.id === val)) {
					// we fetch the info of a specific Discord channel
					// this should be used only in very specific cases
					// such as the bot joined a channel that was just created and is not in Discord API's cache yet
					try {
						const { data } = await this.$axios(`/api/private-discord/channel/${val}`, {
							progress: false
						})
						this.channels.push(data.data)
					} catch (e) {
						// if even like this we can't find this channel yet due to the API,
						// we'll still provide a 'temporary' channel
						this.channels.push({
							id     : val,
							name   : 'Not in Discord\'s cache yet',
							members: []
						})
						console.warn(e.message)
					}
				}
			}
		}
	},

	async created () {
		try {
			this.error = null
			const { data } = await this.$axios.get('/api/private-discord/channels')
			this.channels = data.data
		} catch (e) {
			this.error = e.message || e
		}
	},

	mounted () {
		if (this.$root.mainSocket)
			this.onNewVoiceChan()
		else
			this.$root.$on('mainSocketInit', this.onNewVoiceChan)
	},

	beforeUnmount () {
		this.$root.mainSocket.off('discordNewVoiceChan', this.voiceChanAdded)
		this.$root.mainSocket.off('discordUserJoined', this.voiceUserJoined)
		this.$root.mainSocket.off('discordUserLeave', this.voiceUserLeft)
		this.$root.mainSocket.off('discordVoiceChanRemoved', this.voiceChanRemoved)
		this.$root.mainSocket.off('discordVoiceChanUpdated', this.voiceChanUpdated)
	},

	methods: {
		async joinChannel (id) {
			if (id === 'default')
				return

			this.error = null
			const res = await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'discordJoinChannel',
				msg  : id
			})
			if (res.status !== 'ok')
				this.error = 'An error occurred. Make sure the bot has enough permissions to list the channels and join them.'
		},

		async leaveChannel () {
			await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'discordLeaveChannel'
			})
		},

		onNewVoiceChan () {
			this.$root.mainSocket.on('discordNewVoiceChan', this.voiceChanAdded)
			this.$root.mainSocket.on('discordUserJoined', this.voiceUserJoined)
			this.$root.mainSocket.on('discordUserLeave', this.voiceUserLeft)
			this.$root.mainSocket.on('discordVoiceChanRemoved', this.voiceChanRemoved)
			this.$root.mainSocket.on('discordVoiceChanUpdated', this.voiceChanUpdated)
		},

		voiceChanAdded (channel) {
			this.channels.push(channel)
		},

		voiceChanRemoved (channel) {
			const idx = this.channels.findIndex(c => c.id === channel.id)
			if (idx >= 0)
				this.channels.splice(idx, 1)
		},

		voiceChanUpdated ({ id, name }) {
			const idx = this.channels.findIndex(c => c.id === id)
			if (idx >= 0)
				this.channels[idx].name = name
		},

		voiceUserJoined ({ id, member }) {
			// we need to check if the user is already registered in a voice channel
			// if it was in another channel, we "move" it
			// if it's in the same channel, we do nothing and assume this is a duplicate event
			this.channels.forEach((c, i) => {
				const goodChannel = c.id.toString() === id.toString()
				const idx         = c.members.findIndex(m => m.userID.toString() === member.userID.toString())
				if (goodChannel && idx < 0) // add the member here
					c.members.push(member)
				else if (!goodChannel && idx >= 0) // user moved from this channel to another one
					c.members.splice(idx, 1)
			})
		},

		voiceUserLeft ({ id, member }) {
			// we remove the user from the voice channel they were into
			this.channels.forEach((c) => {
				const goodChannel = c.id.toString() === id.toString()
				const idx         = c.members.findIndex(m => m.userID.toString() === member.userID.toString())
				if (goodChannel && idx >= 0)
					c.members.splice(idx, 1)
			})
		}
	}
}
