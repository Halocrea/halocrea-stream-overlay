<template>
	<flex wrap="wrap">
		<div
			v-for="alert in keyLabels"
			:key="alert.key"
			class="u-flex__item-12@xs u-flex__item-6@sm u-flex__item-12@md u-flex__item-12@lg u-flex__item-6@lg-up u-mb-md"
		>
			<check-switch
				:value="alert.key"
				:checked="$store.state.config.config[alert.key]"
				@change="e => update(alert.key, e.target.checked)"
			>
				{{ alert.label }}
			</check-switch>
		</div>
	</flex>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckSwitch from '~/components/utils/form/CheckSwitch.vue'

export default {
	components: {
		CheckSwitch
	},

	data () {
		return {
			keyLabels: [
				{ key: 'bitsAlerts', label: 'Bits donation' },
				{ key: 'followAlerts', label: 'New follower' },
				{ key: 'hostAlerts', label: 'Host' },
				{ key: 'raidAlerts', label: 'Raid' },
				{ key: 'subAlerts', label: 'New subscriber' }
			],
			loading: false
		}
	},

	computed: {
		...mapGetters({
			bitsAlerts  : 'config/bitsAlerts',
			followAlerts: 'config/followAlerts',
			hostAlerts  : 'config/hostAlerts',
			raidAlerts  : 'config/raidAlerts',
			subAlerts   : 'config/subAlerts'
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
