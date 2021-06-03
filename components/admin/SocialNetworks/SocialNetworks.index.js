import { mapGetters } from 'vuex'
import TextField      from '~/components/utils/form/TextField.vue'

export default {
	components: {
		TextField
	},

	data () {
		return {
			editLines: [], // [{ key, value }]
			newLine  : { key: '', value: '' },
			types    : [
				{ key: 'discord', name: 'Discord' },
				{ key: 'facebook', name: 'Facebook' },
				{ key: 'guilded', name: 'Guilded' },
				{ key: 'instagram', name: 'Instagram' },
				{ key: 'steam', name: 'Steam' },
				{ key: 'tiktok', name: 'TikTok' },
				{ key: 'twitch', name: 'Twitch' },
				{ key: 'twitter', name: 'Twitter' },
				{ key: 'website', name: 'Web' },
				{ key: 'xbox', name: 'Xbox' },
				{ key: 'youtube', name: 'YouTube' }
			]
		}
	},

	computed: {
		...mapGetters({
			socialNetworks: 'config/socialNetworks'
		})
	},

	watch: {
		socialNetworks: {
			immediate: true,
			handler (val) {
				this.editLines = JSON.parse(JSON.stringify(val))
			}
		}
	},

	methods: {
		async addSocialNetwork () {
			await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'configUpdate',
				msg  : { prop: 'socialNetworks', value: [...this.socialNetworks, this.newLine] }
			})
			this.newLine = { key: '', value: '' }
		},

		async removeSocialNetwork (index) {
			this.editLines.splice(index, 1)
			await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'configUpdate',
				msg  : { prop: 'socialNetworks', value: this.editLines }
			})
		},

		async updateSocialNetwork (index) {
			const value  = JSON.parse(JSON.stringify(this.socialNetworks))
			value[index] = this.editLines[index]
			await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'configUpdate',
				msg  : { prop: 'socialNetworks', value }
			})
		}
	}
}
