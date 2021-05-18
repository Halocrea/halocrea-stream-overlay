import { mapGetters } from 'vuex'
import Btn from '~/components/layout/Btn/Btn.vue'

export default {
	components: {
		Btn
	},

	data () {
		return {
			avatar  : null,
			error   : false,
			loading : false,
			open    : false,
			username: ''
		}
	},

	computed: {
		...mapGetters({
			useTwitchFeatures: 'config/useTwitchFeatures'
		})
	},

	created () {
		if (this.useTwitchFeatures) {
			this.loading = true
			this.$axios.get('/api/private-config/user-info')
				.then(({ data }) => {
					this.username  = data.preferred_username
					this.avatar    = data.picture
				}).catch((e) => {
					this.error = true
					console.warn(e)
				}).finally(() => {
					this.loading = false
				})
		} else
			this.username = this.$nuxt.$auth.user.username
	},

	mounted () {
		document.addEventListener('click', this.closeIfNeeded)
	},

	beforeDestoy () {
		document.removeEventListener('click', this.closeIfNeeded)
	},

	methods: {
		closeIfNeeded (event) { // Please refer to the call of this method in mounted()
			let preventClosing = false
			let node = event.target

			while (node !== document.body) {
				if (node) {
					if (event && node.classList && node.classList.contains('menu-prevent-closing')) {
						preventClosing = true
						break
					}
					node = node.parentNode
				} else
					break
			}

			if (preventClosing) {
				event.stopPropagation()
				return true
			}

			this.open = false
			return true
		},

		logout () {
			this.$auth.logout()
				.then(() => {
					this.$router.push('/login')
				})
		}
	}
}
