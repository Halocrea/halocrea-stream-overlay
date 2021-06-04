import CopyUrlBtn        from '~/components/utils/CopyUrlBtn/CopyUrlBtn.vue'
import UserDisplayConfig from '~/components/admin/UserDisplayConfig/UserDisplayConfig.vue'
import UserInfo          from '~/components/user/UserInfo/UserInfo.vue'

export default {
	components: {
		CopyUrlBtn,
		UserDisplayConfig,
		UserInfo
	},

	data () {
		return {
			open: false
		}
	}
}
