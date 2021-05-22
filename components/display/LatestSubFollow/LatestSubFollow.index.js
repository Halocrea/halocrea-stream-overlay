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
			loaded    : false,
			prevSub   : '',
			prevFollow: ''
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
			if (val && this.latestSubscriber)
				this.loaded = true

			this.prevFollow = oldVal
		},

		latestSubscriber (val, oldVal) {
			if (val && this.latestFollower)
				this.loaded = true

			this.prevSub = oldVal
		}
	},

	mounted () {
		if (this.latestFollower && this.latestSubscriber)
			this.loaded = true

		this.$root.$on('end-alert', this.updateSubFollow)
	},

	beforeDestroy () {
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
