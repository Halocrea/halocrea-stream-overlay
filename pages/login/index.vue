<template>
	<flex main="center" cross="center">
		<div v-if="!isTwitchAuth && useTwitchFeatures">
			<twitch-login-btn />
		</div>
		<Login v-else />
	</flex>
</template>

<script>
import { mapGetters } from 'vuex'
import Login          from '~/components/user/Login/Login.vue'
import TwitchLoginBtn from '~/components/twitch/TwitchLoginBtn/TwitchLoginBtn.vue'

export default {
	components: {
		Login,
		TwitchLoginBtn
	},

	layout: 'default',

	validate ({ $auth, redirect }) {
		if ($auth.loggedIn) redirect('/')

		return !$auth.loggedIn
	},

	computed: {
		...mapGetters({
			isTwitchAuth     : 'twitch/isTwitchAuth',
			useTwitchFeatures: 'config/useTwitchFeatures'
		})
	}
}
</script>
