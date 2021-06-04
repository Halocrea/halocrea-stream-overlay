export default {
	props: {
		lastParams: {
			type    : String,
			required: true
		}
	},

	data () {
		return {
			copied: false
		}
	},

	methods: {
		copyToClipboard () {
			const inp = document.createElement('input')
			document.body.appendChild(inp)
			inp.value = window.location.origin + this.lastParams
			inp.select()
			document.execCommand('copy', false)
			inp.remove()

			this.copied = true
			setTimeout(() => {
				this.copied = false
			}, 1000)
		}
	}
}
