<template>
	<div />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters({
			loggedIn: 'isLoggedIn'
		})
	},

	watch: {
		loggedIn: {
			immediate: true,
			handler (val) {
				const token = this.$auth.strategy.token.get()
				const auth  = { token }

				if (!val && this.$root.mainSocket)
					this.$root.mainSocket.disconnect()
				else {
					this.$root.mainSocket = this.$nuxtSocket({
						auth,
						persist : 'mainSocket',
						teardown: true
					})
					this.$root.$emit('mainSocketInit')
				}
			}
		}
	}
}
</script>
