import AlertGifs     from './AlertGifs.vue'
import AlertMessages from './AlertMessages.vue'
import AlertSounds   from './AlertSounds.vue'
import CheckSwitch   from '~/components/utils/form/CheckSwitch.vue'

export default {
	components: {
		AlertGifs,
		AlertMessages,
		AlertSounds,
		CheckSwitch
	},

	props: {
		alertKey: {
			type    : String,
			required: true
		},

		resources: {
			type    : Object,
			required: true
		}
	},

	data () {
		return {
			error       : false,
			showDetails : this.$store.getters['config/alertByType'](this.alertKey),
			updating    : false
		}
	},

	computed: {
		enabled () {
			return this.$store.getters['config/alertByType'](this.alertKey)
		},

		label () {
			return this.$store.getters['twitch/keyLabels'].find(kl => kl.key === this.alertKey).label
		},

		vars () {
			return this.$store.getters['twitch/keyLabels'].find(kl => kl.key === this.alertKey).vars
		}
	},

	methods: {
		async updateEnabled (value) {
			this.updating = true
			const res = await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'configUpdate',
				msg  : { prop: this.alertKey, value }
			})

			if (res.status && res.status === 'ok')
				this.showDetails = value

			this.updating = false
		}
	}
}
