import { mapGetters }        from 'vuex'
import ConfirmDisableTwitch  from '~/components/admin/twitch/ConfirmDisableTwitch/ConfirmDisableTwitch.vue'
import ConfirmEnableTwitch   from '~/components/admin/twitch/ConfirmEnableTwitch/ConfirmEnableTwitch.vue'
import DiscordChannelMembers from '~/components/admin/discord/DiscordChannelMembers/DiscordChannelMembers.vue'
import DiscordChannelSelect  from '~/components/admin/discord/DiscordChannelSelect/DiscordChannelSelect.vue'
import LatestFollowSub       from '~/components/admin/LatestFollowSub/LatestFollowSub.vue'
import OverlayList           from '~/components/admin/overlay/OverlayList/OverlayList.vue'

export default {
	components: {
		ConfirmDisableTwitch,
		ConfirmEnableTwitch,
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
			showDisableTwitch: false,
			showEnableTwitch : false
		}
	},

	created () {
		this.$root.$on('confirmEnableTwitch', this.setShowEnableTwitch)
	},

	beforeUnmount () {
		this.$root.$off('confirmEnableTwitch', this.setShowEnableTwitch)
	},

	computed: {
		...mapGetters({
			discordBotChannel: 'config/discordBotChannel',
			showVoiceChat    : 'config/showVoiceChat',
			useTwitchFeatures: 'config/useTwitchFeatures'
		})
	},

	methods: {
		setShowEnableTwitch () {
			this.showEnableTwitch = true
		}
	}
}
