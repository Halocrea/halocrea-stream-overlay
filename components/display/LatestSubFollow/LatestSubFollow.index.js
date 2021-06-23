import { mapGetters } from 'vuex'

export default {
	props: {
		theme: {
			type    : String,
			required: true
		}
	},

	data () {
		return {
			followerItvl: '',
			prevSub     : '',
			prevFollow  : ''
		}
	},

	computed: {
		transitionDirection () {
			return ['h2a', 'h3', 'Reach', 'h5'].includes(this.theme) ? 'vertical' : 'lateral'
		},

		...mapGetters({
			latestFollower  : 'twitch/latestFollower',
			latestSubscriber: 'twitch/latestSubscriber',
			showLatestFollow: 'config/showLatestFollow',
			showLatestSub   : 'config/showLatestSub'
		})
	},

	watch: {
		latestFollower (val, oldVal) {
			this.prevFollow = oldVal
		},

		latestSubscriber (val, oldVal) {
			this.prevSub = oldVal
		}
	},

	mounted () {
		this.initLatestFollowSubItvl()
		this.$root.$on('end-alert', this.updateSubFollow)
	},

	beforeDestroy () {
		if (this.followerItvl)
			clearInterval(this.followerItvl)
		this.$root.$off('end-alert', this.updateSubFollow)
	},

	methods: {
		confettis (el) {
			const titleWidth = el.offsetWidth
			const totalConfetti = Math.floor(titleWidth / 10)

			for (let i = 0; i <= totalConfetti; i++) {
				const confetto = `<i style="transform: translate3d(${this._randomNumber(1, 500) - 250}px, ${this._randomNumber(1, 200) - 150}px, 0) rotate(${this._randomNumber(1, 360)}deg); background: hsla(${this._randomNumber(1, 360)}, 100%, 50%, 1);"></i>`
				el.insertAdjacentHTML('beforeend', confetto)
			}

			setTimeout(() => el.querySelectorAll('i').forEach(c => c.parentNode.removeChild(c)), 5000)
		},

		initLatestFollowSubItvl () {
			// this interval is to still get the latest follower in almost real-time even if webhooks are not set
			// and also a fallback for latest subscriber
			this.followerItvl = setInterval(async () => {
				try {
					const { data } = await this.$axios.get('/api/public-twitch/latest-follow-sub')
					if (data.follower && data.follower.display_name !== this.latestFollower.display_name) {
						this.$store.commit('twitch/setLatestFollower', data.follower)
						this.$root.$emit('twitchNewFollower', { follower: data.follower })
					}
					if (data.subscriber && data.subscriber.display_name !== this.latestSubscriber.display_name) {
						this.$store.commit('twitch/setLatestSubscriber', data.subscriber)
						this.$root.$emit('twitchSubAlert', { subscriber: data.subscriber })
					}
				} catch (e) {}
			}, 12500)
		},

		updateSubFollow () {
			setTimeout(() => {
				if (this.showLatestFollow && this.prevFollow && (this.latestFollower.display_name !== this.prevFollow.display_name))
					this.confettis(this.$refs.lastFollow)

				if (this.showLatestSub && this.prevSub && (this.latestSubscriber.display_name !== this.prevSub.display_name))
					this.confettis(this.$refs.lastSub)
			}, 2000)
		},

		_randomNumber (min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min)
		}
	}
}
