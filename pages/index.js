import { mapGetters }        from 'vuex'
import AlertList             from '~/components/admin/twitch/AlertList/AlertList.vue'
import ConfirmDisableTwitch  from '~/components/admin/twitch/ConfirmDisableTwitch/ConfirmDisableTwitch.vue'
import DiscordChannelMembers from '~/components/admin/discord/DiscordChannelMembers/DiscordChannelMembers.vue'
import DiscordChannelSelect  from '~/components/admin/discord/DiscordChannelSelect/DiscordChannelSelect.vue'
import DiscordChatTitle      from '~/components/admin/discord/DiscordChatTitle/DiscordChatTitle.vue'
import OverlayList           from '~/components/admin/overlay/OverlayList/OverlayList.vue'
import SocialNetworks        from '~/components/admin/SocialNetworks/SocialNetworks.vue'
import WaitingScreensTabs    from '~/components/admin/WaitingScreensTabs/WaitingScreensTabs.vue'

export default {
	components: {
		AlertList,
		ConfirmDisableTwitch,
		DiscordChannelMembers,
		DiscordChannelSelect,
		DiscordChatTitle,
		OverlayList,
		SocialNetworks,
		WaitingScreensTabs
	},

	layout    : 'admin',
	middleware: ['auth'],

	validate ({ $auth, redirect }) {
		if (!$auth.loggedIn) redirect('/login')

		return $auth.loggedIn
	},

	data () {
		return {
			showDisableTwitch: false
		}
	},

	created () {
		if (this.canUseTwitch && this.useTwitchFeatures)
			this.$axios.get('/api/private-twitch/webhooks').catch(() => {})
	},

	computed: {
		...mapGetters({
			canUseTwitch     : 'config/canUseTwitch',
			discordBotChannel: 'config/discordBotChannel',
			showVoiceChat    : 'config/showVoiceChat',
			useTwitchFeatures: 'config/useTwitchFeatures'
		})
	}
}
