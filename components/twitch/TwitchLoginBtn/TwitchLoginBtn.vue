<template>
	<a
		class="c-twitch-btn o-btn o-btn--big"
		:href="getTwitchLink"
	>
		Authorize Twitch access
	</a>
</template>

<script>
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
		}
	}
}
</script>

<style lang="scss">
.c-twitch-btn {
	background-color: var(--color-twitch);
}
</style>
