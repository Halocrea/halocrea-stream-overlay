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
		<site-footer />
		<transition name="u-transition--fade" mode="out-in">
			<confirm-enable-twitch
				v-if="showEnableTwitch"
				@close="() => showEnableTwitch = false"
			/>
		</transition>
	</flex>
	<flex
		v-else
		class="auth-warning"
		direction="column"
		main="center"
		cross="center"
	>
		<flex
			v-if="canUseTwitch"
			class="u-p-lg u-m-lg"
			direction="column"
			cross="center"
		>
			<p class="u-mb-md">
				{{ $t('layouts.admin.reauthenticateTwitch') }}
			</p>
			<twitch-login-btn />
		</flex>
		<flex
			v-else
			class="u-p-lg u-m-lg"
			direction="column"
			cross="center"
		>
			<p class="u-mb-md">
				{{ $t('layouts.admin.error') }}
			</p>
		</flex>
		<site-footer />
	</flex>
</template>

<script>
import { mapGetters }      from 'vuex'
import AdminTopBar         from '~/components/layout/AdminTopBar/AdminTopBar.vue'
import Background          from '~/components/layout/Background/Background.vue'
import ConfirmEnableTwitch from '~/components/admin/twitch/ConfirmEnableTwitch/ConfirmEnableTwitch.vue'
import SiteFooter          from '~/components/layout/SiteFooter/SiteFooter.vue'
import SocketClient        from '~/components/utils/SocketClient.vue'
import TwitchLoginBtn      from '~/components/twitch/TwitchLoginBtn/TwitchLoginBtn.vue'

export default {
	components: {
		AdminTopBar,
		Background,
		ConfirmEnableTwitch,
		SiteFooter,
		SocketClient,
		TwitchLoginBtn
	},

	data () {
		return {
			showEnableTwitch     : false,
			twitchFeaturesEnabled: false
		}
	},

	computed: {
		...mapGetters({
			canUseTwitch     : 'config/canUseTwitch',
			isTwitchAuth     : 'twitch/isTwitchAuth',
			twitchKeyLabels  : 'twitch/keyLabels',
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
	},

	created () {
		this.$root.$on('confirmEnableTwitch', this.setShowEnableTwitch)

		// this is only to translate the labels of the alert types in the store
		const tmp = JSON.parse(JSON.stringify(this.twitchKeyLabels))
		tmp.forEach((kl) => {
			kl.label = this.$t(`store.twitch.keyLabels.${kl.key}`)
		})
		this.$store.commit('twitch/setKeyLabels', tmp)
	},

	beforeUnmount () {
		this.$root.$off('confirmEnableTwitch', this.setShowEnableTwitch)
	},

	methods: {
		setShowEnableTwitch () {
			this.showEnableTwitch = this.canUseTwitch
		}
	}
}
</script>

<style lang="scss">
@import '~assets/styles/global/variables';

.admin-layout {
	width           : 100vw;
	height          : 100vh;
	overflow-x      : hidden;
	overflow-y      : auto;
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
