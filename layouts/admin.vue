<template>
	<flex
		v-if="isTwitchAuth || !twitchFeaturesEnabled"
		class="admin-layout"
		direction="column"
		main="stretch"
		cross="center"
	>
		<background style="opacity: .2" />
		<admin-top-bar />
		<div class="admin-layout__content">
			<transition
				name="u-transition--lateral"
				mode="out-in"
			>
				<Nuxt />
			</transition>
		</div>
		<client-only>
			<socket-client />
		</client-only>
	</flex>
	<flex
		v-else
		class="auth-warning"
		direction="column"
		main="center"
		cross="center"
	>
		<flex class="u-p-lg u-m-lg" direction="column" cross="center">
			<p class="u-mb-md">
				Welp, we need to (re)authorize the app on Twitch
			</p>
			<twitch-login-btn />
		</flex>
	</flex>
</template>

<script>
import { mapGetters } from 'vuex'
import AdminTopBar    from '~/components/layout/AdminTopBar/AdminTopBar.vue'
import Background     from '~/components/layout/Background/Background.vue'
import SocketClient   from '~/components/utils/SocketClient.vue'
import TwitchLoginBtn from '~/components/twitch/TwitchLoginBtn/TwitchLoginBtn.vue'

export default {
	components: {
		AdminTopBar,
		Background,
		SocketClient,
		TwitchLoginBtn
	},

	data () {
		return {
			twitchFeaturesEnabled: false
		}
	},

	computed: {
		...mapGetters({
			isTwitchAuth     : 'twitch/isTwitchAuth',
			useTwitchFeatures: 'config/useTwitchFeatures'
		})
	},

	watch: {
		// doing this instead of directly using the computed property
		// because it seems there might be a reactivity issue with this getter on this page
		useTwitchFeatures: {
			immediate: true,
			handler (val) {
				this.twitchFeaturesEnabled = val
			}
		}
	}
}
</script>

<style lang="scss">
@import '~assets/styles/global/variables';

.admin-layout {
	width           : 100vw;
	height          : 100vh;
	background-color: var(--color-base-3);

	&__content {
		width: 100%;
		flex-grow: 1;
	}

	.c-bg-image { z-index: 0; }
	& > *:not(.c-bg-image) {
		position: relative;
		z-index : 1;
	}
}
.auth-warning {
	width           : 100vw;
	height          : 100vh;
	background-color: var(--color-base-3);
	& > * {
	background-color: rgba(0, 0, 0, .25);
	border          : .1rem solid rgba(255, 255, 255, .25);
	box-shadow      : $subtle-box-shadow;
	}
}
</style>
