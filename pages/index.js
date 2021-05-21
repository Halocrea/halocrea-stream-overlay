import { mapGetters }        from 'vuex'
import AlertList             from '~/components/admin/twitch/AlertList/AlertList.vue'
import ConfirmDisableTwitch  from '~/components/admin/twitch/ConfirmDisableTwitch/ConfirmDisableTwitch.vue'
import DiscordChannelMembers from '~/components/admin/discord/DiscordChannelMembers/DiscordChannelMembers.vue'
import DiscordChannelSelect  from '~/components/admin/discord/DiscordChannelSelect/DiscordChannelSelect.vue'
import LatestFollowSub       from '~/components/admin/LatestFollowSub/LatestFollowSub.vue'
import OverlayList           from '~/components/admin/overlay/OverlayList/OverlayList.vue'

export default {
	components: {
		AlertList,
		ConfirmDisableTwitch,
		DiscordChannelMembers,
		DiscordChannelSelect,
		LatestFollowSub,
		OverlayList
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

	computed: {
		...mapGetters({
			canUseTwitch     : 'config/canUseTwitch',
			discordBotChannel: 'config/discordBotChannel',
			showVoiceChat    : 'config/showVoiceChat',
			useTwitchFeatures: 'config/useTwitchFeatures'
		})
	}
}
