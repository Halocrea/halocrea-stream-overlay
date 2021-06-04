import { mapGetters } from 'vuex'
import Alert          from './Alert/Alert.vue'

export default {
	components: {
		Alert
	},

	props: {
		resources: {
			type    : Object,
			required: true
		}
	},

	emits: ['new-alert', 'end-alert'],

	data () {
		return {
			eventHandlers: [
				// For testing purpose mostly!
				// {
				// 	event  : 'twitchChatMessage',
				// 	handler: ({ color, username }) => {
				// 		const alert = {
				// 			cinemascope: true,
				// 			color
				// 		}
				// 		const { msgs, gifs, snds } = this.useDataByType('subAlerts')
				// 		if (msgs && msgs.length > 0)
				// 			alert.message = msgs[Math.floor(Math.random() * msgs.length)]
				// 		if (gifs && gifs.length > 0)
				// 			alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
				// 		if (snds && snds.length > 0)
				// 			alert.sound = snds[this.queue.length % snds.length]

				// 		alert.message = alert.message.replace(/{{username}}/g, username)
				// 		this.genAlert(alert)
				// 	}
				// },
				{
					event  : 'twitchBitsAlert',
					handler: ({ bits, color, username }) => {
						const alert = {
							cinemascope: false,
							color
						}
						const { msgs, gifs, snds } = this.useDataByType('bitsAlerts')
						if (msgs && msgs.length > 0)
							alert.message = msgs[Math.floor(Math.random() * msgs.length)]
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[this.queue.length % snds.length]

						alert.message = alert.message.replace(/{{username}}/g, username)
						alert.message = alert.message.replace(/{{bits}}/g, bits)
						this.genAlert(alert)
					}
				},
				{
					event  : 'twitchNewFollower',
					handler: ({ follower }) => {
						if (!this.followAlerts)
							return

						const alert = {
							cinemascope: false,
							color      : '#177de9'
						}
						const { msgs, gifs, snds } = this.useDataByType('followAlerts')
						if (msgs && msgs.length > 0)
							alert.message = msgs[Math.floor(Math.random() * msgs.length)]
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[this.queue.length % snds.length]

						alert.message = alert.message.replace(/{{username}}/g, follower.from_name)
						this.genAlert(alert)
					}
				},
				{
					event  : 'twitchSubAlert',
					handler: ({ color, username }) => {
						if (!this.subAlerts)
							return

						const alert = {
							cinemascope: false,
							color
						}
						const { msgs, gifs, snds } = this.useDataByType('subAlerts')
						if (msgs && msgs.length > 0)
							alert.message = msgs[Math.floor(Math.random() * msgs.length)]
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[this.queue.length % snds.length]

						alert.message = alert.message.replace(/{{username}}/g, username)
						this.genAlert(alert)
					}
				},
				{
					event  : 'twitchSubgiftAlert',
					handler: ({ color, sender, username }) => {
						if (!this.subAlerts)
							return

						const alert = {
							cinemascope: true,
							color
						}
						const { gifs, msgs, snds } = this.useDataByType('subgiftAlerts')
						if (msgs && msgs.length > 0)
							alert.message = msgs[Math.floor(Math.random() * msgs.length)]
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[this.queue.length % snds.length]

						alert.message = alert.message.replace(/{{recipient}}/g, username)
						alert.message = alert.message.replace(/{{sender}}/g, sender)
						this.genAlert(alert)
					}
				},
				{
					event  : 'twitchResubAlert',
					handler: ({ color, cumulativeMonths, username }) => {
						if (!this.subAlerts)
							return

						const alert = {
							cinemascope: false,
							color
						}
						const { msgs, gifs, snds } = this.useDataByType('resubAlerts')
						if (msgs && msgs.length > 0)
							alert.message = msgs[Math.floor(Math.random() * msgs.length)]
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[this.queue.length % snds.length]

						alert.message = alert.message.replace(/{{username}}/g, username)
						alert.message = alert.message.replace(/{{cumulativeMonths}}/g, cumulativeMonths)
						this.genAlert(alert)
					}
				},
				{
					event  : 'twitchRaidAlert',
					handler: ({ color, username }) => {
						if (!this.raidAlerts)
							return

						const alert = {
							cinemascope: false,
							color
						}
						const { msgs, gifs, snds } = this.useDataByType('raidAlerts')
						if (msgs && msgs.length > 0)
							alert.message = msgs[Math.floor(Math.random() * msgs.length)]
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[this.queue.length % snds.length]

						alert.message = alert.message.replace(/{{username}}/g, username)
						this.genAlert(alert)
					}
				},
				{
					event  : 'twitchHostAlert',
					handler: ({ host, viewers }) => {
						if (!this.hostAlerts)
							return

						const alert = { cinemascope: false }
						const { msgs, gifs, snds } = this.useDataByType('hostAlerts')
						if (msgs && msgs.length > 0)
							alert.message = msgs[Math.floor(Math.random() * msgs.length)]
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[this.queue.length % snds.length]

						alert.message = alert.message.replace(/{{username}}/g, host)
						alert.message = alert.message.replace(/{{viewers}}/g, viewers)
						this.genAlert(alert)
					}
				}
			],
			queue  : [],
			current: null
		}
	},

	computed: {
		...mapGetters({
			bitAlerts   : 'config/bitAlerts',
			followAlerts: 'config/followAlerts',
			hostAlerts  : 'config/hostAlerts',
			raidAlerts  : 'config/raidAlerts',
			subAlerts   : 'config/subAlerts'
		})
	},

	watch: {
		current (newVal, oldVal) {
			if (newVal && !oldVal)
				this.$emit('new-alert')
		},

		'queue.length' (val) {
			if (val > 0 && !this.current)
				this.current = this.queue[0]

			if (val < 1)
				this.$emit('end-alert')
		}
	},

	mounted () {
		if (this.$root.mainSocket)
			this.onTwitchAlert()
		else
			this.$root.$on('mainSocketInit', this.onTwitchAlert)
	},

	beforeUnmount () {
		this.eventHandlers.forEach(({ event, handler }) =>
			this.$root.mainSocket.off(event, handler)
		)
	},

	methods: {
		genAlert (alert) { // { cinemascope = false, gif, message, sound }
			this.queue.push(alert)
		},

		onEndAlert () {
			this.current = null
			this.queue.splice(0, 1)
		},

		onTwitchAlert () {
			this.eventHandlers.forEach(({ event, handler }) =>
				this.$root.mainSocket.on(event, handler)
			)
		},

		useDataByType (type) {
			return {
				gifs: this.resources[type].gifs,
				msgs: this.resources[type].messages,
				snds: this.resources[type].sounds
			}
		}
	}
}
