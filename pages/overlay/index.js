import { mapGetters }  from 'vuex'
import Alerts          from '~/components/display/Alerts/Alerts.vue'
import DiscordChat     from '~/components/display/DiscordChat/DiscordChat.vue'
import LatestSubFollow from '~/components/display/LatestSubFollow/LatestSubFollow.vue'
import SocialNetworks  from '~/components/display/SocialNetworks/SocialNetworks.vue'

export default {
	components: {
		Alerts,
		DiscordChat,
		LatestSubFollow,
		SocialNetworks
	},

	layout: 'overlay',

	async asyncData ({ $axios, query }) {
		const { data } = await $axios.get(`${process.env.BASE_URL}/api/public-config/resources`)
		return {
			resources  : data,
			forcedTheme: query.force || false
		}
	},

	data () {
		return {
			playingAlert: false,
			switching   : true,
			theme       : ''
		}
	},

	computed: {
		...mapGetters({
			canUseTwitch : 'config/canUseTwitch',
			configTheme  : 'config/selectedVoiceChatOverlay',
			showVoiceChat: 'config/showVoiceChat'
		})
	},

	watch: {
		configTheme (val) {
			if (this.forcedTheme)
				return

			this.switching = true
			setTimeout(() => {
				this.theme     = val
				this.switching = false
			}, 500)
		}
	},

	created () {
		this.theme = this.forcedTheme || this.configTheme
		setTimeout(() => {
			this.switching = false
		}, 500)
	}
}
