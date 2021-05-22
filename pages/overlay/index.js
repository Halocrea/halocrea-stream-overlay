import { mapGetters } from 'vuex'
import DiscordChat    from '~/components/display/DiscordChat/DiscordChat.vue'

export default {
	components: {
		DiscordChat
	},

	layout: 'overlay',

	asyncData ({ query }) {
		return {
			forcedTheme: query.force || false
		}
	},

	data () {
		return {
			switching: true,
			theme    : ''
		}
	},

	computed: {
		...mapGetters({
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
