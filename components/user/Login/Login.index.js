import BusyOverlay from '~/components/utils/BusyOverlay'
import TextField   from '~/components/utils/form/TextField'

export default {
	components: {
		BusyOverlay,
		TextField
	},

	data () {
		return {
			email   : '',
			password: '',
			error   : null
		}
	},

	computed: {
		redirect () {
			return (
				this.$route.query.redirect &&
				decodeURIComponent(this.$route.query.redirect)
			)
		},

		isCallback () {
			return !!this.$route.query.callback
		},

		errorMessage () {
			const { error } = this
			if (!error || typeof error === 'string')
				return error

			let msg = ''
			if (error.message)
				msg += error.message

			if (error.errors) {
				msg += `(${JSON.stringify(error.errors)
					.replace(/[{}"[\]]/g, '')
					.replace(/:/g, ': ')
					.replace(/,/g, ' ')})`
			}
			return msg
		}
	},

	methods: {
		login () {
			this.error = null

			return this.$auth
				.loginWith('local', {
					data: {
						email   : this.email,
						password: this.password
					}
				})
				.then(({ data }) => {
					if (!data)
						return
					this.$store.commit('twitch/setTwitchAuth', true)
					this.$router.push('/')
				})
				.catch((e) => {
					console.warn(`Error in components/Login/Login.js#login: ${e.response.data}`)
					this.error = e.response.data
				})
		}
	}
}
