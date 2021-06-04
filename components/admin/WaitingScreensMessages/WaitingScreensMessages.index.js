import TextField from '~/components/utils/form/TextField.vue'

export default {
	components: {
		TextField
	},

	props: {
		screen: { // introMsgs, interludeMsgs, outroMsgs
			type    : String,
			required: true
		}
	},

	data () {
		return {
			editLines: [], // [ 'message 1', 'message 2', ... ]
			newLine  : ''
		}
	},

	computed: {
		getMsgs () {
			return this.$store.getters[`config/${this.screen}`]
		}
	},

	watch: {
		getMsgs: {
			immediate: true,
			handler (val) {
				this.editLines = JSON.parse(JSON.stringify(val))
			}
		}
	},

	methods: {
		async addMessage () {
			await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'configUpdate',
				msg  : { prop: this.screen, value: [...this.getMsgs, this.newLine] }
			})
			this.newLine = ''
		},

		async removeMessage (index) {
			this.editLines.splice(index, 1)
			await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'configUpdate',
				msg  : { prop: this.screen, value: this.editLines }
			})
		},

		async updateMessage (index) {
			const value  = JSON.parse(JSON.stringify(this.getMsgs))
			value[index] = this.editLines[index]
			await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'configUpdate',
				msg  : { prop: this.screen, value }
			})
		}
	}
}
