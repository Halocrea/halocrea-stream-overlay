export default {
	props: {
		options: {
			type    : Array,
			required: false,
			default : () => [
				{
					key  : '',
					label: ''
				}
			]
		},

		value: {
			type    : String,
			required: false,
			default : ''
		}
	},

	data () {
		return {
			isOpen: false
		}
	},

	mounted () {
		document.addEventListener('click', (e) => {
			if (e.target !== this.$refs.select)
				this.closeIfNeeded(e)
		})
	},

	methods: {
		closeIfNeeded (event) { // Please refer to the call of this method in mounted()
			let preventClosing = false
			let node = event.target

			while (node !== document.body) {
				if (node) {
					if (event && node.classList && node.classList.contains('custom-select-prevent-closing')) {
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

			this.isOpen = false
			return true
		},

		valueChanged (v) {
			this.$emit('onchange', v)
		}
	}
}
