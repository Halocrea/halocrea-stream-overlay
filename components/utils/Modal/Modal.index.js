export default {
	props: {
		overlayClose: {
			type    : Boolean,
			required: false,
			default : true
		}
	},

	data () {
		return {
		}
	},

	beforeMount () {
		this.$root.$on('closeModals', () => {
			this.onClose()
		})
	},

	mounted () {
		if (this.$keyNav) {
			this.$keyNav.register(['Escape'], () => {
				this.$root.$emit('closeModals')
				document.body.click()
			})
		}
	},

	beforeUnmount () {
		this.$keyNav.unregister(['Escape'])
	},

	methods: {
		closeIfNeeded (event) { // Please refer to the call of this method in mounted()
			let preventClosing = false
			let node           = event.target

			while (node !== document.body) {
				if (node) {
					if (event && node.classList && node.classList.contains('js-prevent-modal-close')) {
						preventClosing = true
						break
					}
					node = node.parentNode
				} else
					break
			}

			return preventClosing
		},

		onClose (check = true, e = null) {
			if ((check && !e) || !this.closeIfNeeded(e))
				this.$emit('close')
		}
	}
}
