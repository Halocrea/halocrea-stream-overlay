
export default {
	props: {
		color: {
			type    : String,
			required: true
		},

		gif: {
			type    : String,
			required: true
		},

		sound: {
			type    : String,
			required: true
		},

		message: {
			type    : String,
			required: true
		}
	},

	emits: ['ended'],

	data () {
		return {
			loaded: true
		}
	},

	mounted () {
		const audio   = new Audio(`/sounds/${this.sound}`)
		audio.onended = () => this.$emit('ended')
		audio.addEventListener('canplaythrough', () => {
			this.loaded = true
			audio.play()
		})
	}
}
