export default {
	props: {
		disabled: {
			type    : Boolean,
			required: false,
			default : false
		},
		link: {
			type    : String,
			required: false,
			default : ''
		},
		routerLink: {
			type    : Object,
			required: false,
			default : () => { }
		}
	},

	data () {
		return {
			btnClicked: false,
			timeOut   : null
		}
	},

	methods: {
		click () {
			if (this.timeOut) {
				clearTimeout(this.timeOut)
				this.timeOut    = null
				this.btnClicked = false
			}
			this.btnClicked = true
			this.timeOut    = setTimeout(() => {
				this.btnClicked = false
			}, 300)
		}
	}
}
