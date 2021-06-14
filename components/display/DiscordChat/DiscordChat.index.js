import { mapGetters } from 'vuex'

export default {
	props: {
		theme: {
			type    : String,
			required: true
		}
	},

	computed: {
		showHeadRow () {
			// there's an additionnal row before the members in some themes
			return ['menu'].includes(this.theme)
		},

		showUsersIcon () {
			// there's a users icon with the count in some themes
			return !['menu'].includes(this.theme)
		},

		...mapGetters({
			members       : 'discord/members',
			voiceChatTitle: 'config/voiceChatTitle'
		})
	},

	methods: {
		backgroundColor (userRoleColor) {
			if (['h2', 'h2a'].includes(this.theme) && userRoleColor === 'ffffff')
				return '177de9cc'

			return userRoleColor
		},

		textColor (bgColor) {
			if (['h2', 'h2a'].includes(this.theme) && bgColor === 'ffffff')
				return '#ffffff'

			const rgb   = parseInt(bgColor, 16) // convert rrggbb to decimal
			const r     = (rgb >> 16) & 0xFF // extract red
			const g     = (rgb >> 8) & 0xFF // extract green
			const b     = (rgb >> 0) & 0xFF // extract blue
			const luma  = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

			if (luma > 150)
				return '#000000'

			return '#ffffff'
		}
	}
}
