import TextField           from '~/components/utils/form/TextField'
import TwitchTokenVerifier from '~/components/twitch/TwitchTokenVerifier/TwitchTokenVerifier.vue'

export default {
	components: {
		TextField,
		TwitchTokenVerifier
	},

	layout: 'default',

	validate ({ query }) {
		return !!query.code
	},

	async asyncData ({ $axios, query }) {
		const { data } = await $axios.post(`${process.env.BASE_URL}/api/twitch-oauth2/${query.code}`)
		return {
			twitchRes: data
		}
	},

	data () {
		return {
			error   : null,
			password: '',
			payload : null
		}
	},

	methods: {
		login () {
			this.error = null

			return this.$auth
				.loginWith('local', {
					data: {
						email    : this.payload.email,
						password : this.password,
						twitchRes: this.twitchRes,
						openId   : this.payload
					}
				})
				.then(({ data }) => {
					if (!data)
						return
					this.$store.commit('twitch/setTwitchAuth', true)
					this.$router.push('/')
				})
				.catch((e) => {
					console.warn(`Error in pages/oauth2_return.vue#login: ${e}`)
					this.error = e.response.data
				})
		},

		proceedToLogin (payload) {
			this.payload = payload
		}
	}
}
