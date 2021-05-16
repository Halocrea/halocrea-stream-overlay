<template>
	<flex class="c-user-display-config">
		<div class="u-mr-lg">
			<check-switch
				:checked="showTwitchAlerts"
				:disabled="loading"
				@change="e => update('showTwitchAlerts', e.target.checked)"
			>
				Sub/Follow alerts
			</check-switch>
		</div>
		<div class="u-mr-lg">
			<check-switch
				:checked="showVoiceChat"
				:disabled="loading"
				@change="e => update('showVoiceChat', e.target.checked)"
			>
				Voice chat
			</check-switch>
		</div>
		<div class="u-mr-lg">
			<check-switch
				:checked="showLatestSub"
				:disabled="loading"
				@change="e => update('showLatestSub', e.target.checked)"
			>
				Latest sub
			</check-switch>
		</div>
		<div class="u-mr-lg">
			<check-switch
				:checked="showLatestFollow"
				:disabled="loading"
				@change="e => update('showLatestFollow', e.target.checked)"
			>
				Latest follow
			</check-switch>
		</div>
	</flex>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckSwitch    from '~/components/utils/form/CheckSwitch.vue'

export default {
	components: {
		CheckSwitch
	},

	data () {
		return {
			loading: false
		}
	},

	computed: {
		...mapGetters({
			showLatestFollow: 'config/showLatestFollow',
			showLatestSub   : 'config/showLatestSub',
			showTwitchAlerts: 'config/showTwitchAlerts',
			showVoiceChat   : 'config/showVoiceChat'
		})
	},

	methods: {
		async update (prop, value) {
			this.loading = true
			await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'configUpdate',
				msg  : { prop, value }
			})
			this.loading = false
		}
	}
}
</script>
