<template>
	<a
		v-if="canUseTwitch"
		class="c-twitch-btn o-btn o-btn--big"
		:href="getTwitchLink"
	>
		Authorize Twitch access
	</a>
	<flex v-else direction="column" cross="center">
		<p class="u-my-md u-text-red">
			The project is missing some configuration (Twitch Client ID and/or Client Secret) and so won't be able to connect to Twitch.
		</p>
	</flex>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data () {
		return {
			claims: {
				id_token: {
					email             : null,
					picture           : null,
					preferred_username: null
				},
				userinfo:{
					picture: null,
					preferred_username: null
				}
			},
			scope: [
				'openid',
				'channel:read:redemptions',
				'channel:read:subscriptions',
				'channel_subscriptions',
				'chat:read',
				'user:read:broadcast',
				'user:read:email',
				'user:read:follows'
			]
		}
	},

	computed: {
		getTwitchLink () {
			return `https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=${
					process.env.TWITCH_CLIENT_ID
				}&redirect_uri=${
					process.env.BASE_URL
				}/oauth2_return&scope=${
					encodeURIComponent(this.scope.join(' '))
				}&claims=${
					encodeURIComponent(JSON.stringify(this.claims))
				}`
		},

		...mapGetters({
			canUseTwitch: 'config/canUseTwitch'
		})
	}
}
</script>

<style lang="scss">
.c-twitch-btn {
	background-color: var(--color-twitch);
}
</style>
