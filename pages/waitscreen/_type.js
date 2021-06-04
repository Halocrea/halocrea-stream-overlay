import { mapGetters } from 'vuex'

export default {
	layout: 'overlay',

	data () {
		return {
			currentIdx: 0,
			currentMsg: '',
			emotes    : [
				'arbicroissant.png', 'creatune.png', 'fail.png', 'forklift.png', 'grena.png', 'honhon.png', 'kappa.png', 'love.png',
				'maurice.png', 'mimoune.png', 'ouioui.png', 'really.png', 'tektek.png', 'catjam.gif'
			],
			emote1      : '',
			emote2      : '',
			linkPosition: 1,
			odstLayers: [
				'01.png', '02.png', '03.png', '06.png', '07.png', '08.png', '09.png', '10.png',
				'11.png', '12.png', '13.png', '14.png'
			],
			queue: ['']
		}
	},

	computed: {
		getMessages () {
			return this.$store.getters[`config/${this.$route.params.type}`]
		},

		...mapGetters({
			links: 'config/socialNetworks'
		})
	},

	watch: {
		currentIdx (val) {
			this.currentMsg = this.getMessages[val] + ''
		}
	},

	created () {
		if (this.getMessages.length > 0)
			this.currentMsg = this.getMessages[0] + '' // to pass value instead of ref

		this.emote1 = this.emotes[Math.floor(Math.random() * this.emotes.length)]
		this.emote2 = this.emotes[Math.floor(Math.random() * this.emotes.length)]
	},

	mounted () {
		this.setMessageInterval()
		this.setEmotesInterval()
		this.setLinksInterval()
	},

	methods: {
		setEmotesInterval () {
			setInterval(() => {
				this.emote1 = this.emotes[Math.floor(Math.random() * this.emotes.length)]
				setTimeout(() => {
					this.emote2 = this.emotes[Math.floor(Math.random() * this.emotes.length)]
					if (this.emote2 === this.emote1)
						this.emote2 = this.emotes[Math.floor(Math.random() * this.emotes.length)]
				}, 250)
			}, 15 * 1000)
		},

		setMessageInterval () {
			setTimeout(() => {
				setInterval(() => {
					this.currentIdx =
						this.currentIdx + 1 >= this.getMessages.length ? 0 : this.currentIdx + 1
				}, 10 * 1000)
			}, 5 * 1000)
		},

		setLinksInterval () {
			setInterval(() => {
				this.linkPosition = Math.min(
					this.links.length - 1, Math.floor(Math.random() * this.links.length)
				)
			}, 3 * 1000)
		}
	}
}
