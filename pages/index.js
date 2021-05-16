import { mapGetters }       from 'vuex'
import DiscordChannelSelect from '~/components/admin/DiscordChannelSelect/DiscordChannelSelect.vue'
import LatestFollowSub      from '~/components/admin/LatestFollowSub/LatestFollowSub.vue'

export default {
	components: {
		DiscordChannelSelect,
		LatestFollowSub
	},

	layout    : 'admin',
	middleware: ['auth'],

	validate ({ $auth, redirect }) {
		if (!$auth.loggedIn) redirect('/login')

		return $auth.loggedIn
	},

	computed: {
		...mapGetters({
			discordBotChannel: 'config/discordBotChannel'
		})
	}
}
