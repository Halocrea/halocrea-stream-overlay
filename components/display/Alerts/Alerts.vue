<template>
	<div />
</template>

<script>
export default {
	props: {
		resources: {
			type    : Object,
			required: true
		}
	},

	data () {
		return {
			eventHandlers: [
				{
					name: 'twitchNewFollower',
					handler ({ follower }) {
						const alert = {
							cinemascope: false,
							color      : '#177de9'
						}
						const msgs  = this.resources.followAlerts.messages
						const gifs  = this.resources.followAlerts.gifs
						const snds  = this.resources.followAlerts.sounds
						if (msgs && msgs.length > 0)
							alert.message = msgs[Math.floor(Math.random() * msgs.length)]
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[Math.floor(Math.random() * snds.length)]

						alert.message = alert.message.replace(/{{username}}/g, follower.from_name)
						this.genAlert(alert)
					}
				},
				{
					name: 'twitchSubAlert',
					handler (obj) {
						const alert = { cinemascope: true }
						const msgs  = this.resources.subAlerts.messages
						const gifs  = this.resources.subAlerts.gifs
						const snds  = this.resources.subAlerts.sounds
						if (msgs && msgs.length > 0)
							alert.message = msgs[Math.floor(Math.random() * msgs.length)]
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[Math.floor(Math.random() * snds.length)]

						this.genAlert(alert)
					}
				},
				{
					name: 'twitchSubgiftAlert',
					handler (obj) {
						const alert = {
							cinemascope: true,
							message    : '{{sender}} gifted a sub to {{username}}!'
						}
						const gifs  = this.resources.subAlerts.gifs
						const snds  = this.resources.subAlerts.sounds
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[Math.floor(Math.random() * snds.length)]

						this.genAlert(alert)
					}
				},
				{
					name: 'twitchResubAlert',
					handler (obj) {
						const alert = { cinemascope: true }
						const msgs  = this.resources.subAlerts.messages
						const gifs  = this.resources.subAlerts.gifs
						const snds  = this.resources.subAlerts.sounds
						if (msgs && msgs.length > 0)
							alert.message = msgs[Math.floor(Math.random() * msgs.length)]
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[Math.floor(Math.random() * snds.length)]

						this.genAlert(alert)
					}
				},
				{
					name: 'twitchRaidAlert',
					handler (obj) {
						const alert = { cinemascope: true }
						const msgs  = this.resources.raidAlerts.messages
						const gifs  = this.resources.raidAlerts.gifs
						const snds  = this.resources.raidAlerts.sounds
						if (msgs && msgs.length > 0)
							alert.message = msgs[Math.floor(Math.random() * msgs.length)]
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[Math.floor(Math.random() * snds.length)]

						this.genAlert(alert)
					}
				},
				{
					name: 'twitchHostAlert',
					handler (obj) {
						const alert = { cinemascope: false }
						const msgs  = this.resources.hostAlerts.messages
						const gifs  = this.resources.hostAlerts.gifs
						const snds  = this.resources.hostAlerts.sounds
						if (msgs && msgs.length > 0)
							alert.message = msgs[Math.floor(Math.random() * msgs.length)]
						if (gifs && gifs.length > 0)
							alert.gif = gifs[Math.floor(Math.random() * gifs.length)]
						if (snds && snds.length > 0)
							alert.sound = snds[Math.floor(Math.random() * snds.length)]

						this.genAlert(alert)
					}
				}
			],
			queue  : [],
			current: null
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
			if (this.current.length < 1)
				this.current = alert
			else
				this.queue.push(alert)
		},

		onTwitchAlert () {
			this.eventHandlers.forEach(({ event, handler }) =>
				this.$root.mainSocket.on(event, handler)
			)
		}
	}
}
</script>
