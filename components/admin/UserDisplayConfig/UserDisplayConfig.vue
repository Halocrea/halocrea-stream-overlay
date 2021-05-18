<template>
	<flex class="c-user-display-config">
		<div class="u-mr-lg">
			<check-switch
				:checked="showVoiceChat"
				:disabled="loading"
				@change="e => update('showVoiceChat', e.target.checked)"
			>
				Voice chat
			</check-switch>
		</div>
		<div class="u-mr-lg" @click="confirmEnable">
			<check-switch
				:checked="showTwitchAlerts"
				:disabled="loading || !useTwitchFeatures"
				@change="e => update('showTwitchAlerts', e.target.checked)"
			>
				Twitch alerts
			</check-switch>
		</div>
		<div class="u-mr-lg" @click="confirmEnable">
			<check-switch
				:checked="showLatestSub"
				:disabled="loading || !useTwitchFeatures"
				@change="e => update('showLatestSub', e.target.checked)"
			>
				Latest sub
			</check-switch>
		</div>
		<div class="u-mr-lg" @click="confirmEnable">
			<check-switch
				:checked="showLatestFollow"
				:disabled="loading || !useTwitchFeatures"
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
			showLatestFollow : 'config/showLatestFollow',
			showLatestSub    : 'config/showLatestSub',
			showTwitchAlerts : 'config/showTwitchAlerts',
			showVoiceChat    : 'config/showVoiceChat',
			useTwitchFeatures: 'config/useTwitchFeatures'
		})
	},

	methods: {
		confirmEnable () {
			if (!this.useTwitchFeatures)
				this.$root.$emit('confirmEnableTwitch')
		},

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
