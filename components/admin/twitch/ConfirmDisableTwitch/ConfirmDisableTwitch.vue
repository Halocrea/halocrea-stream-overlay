<template>
	<form @submit.prevent="disable">
		<modal
			:overlay-close="true"
			max-width="sm"
			@close="() => $emit('close')"
		>
			<template #title>
				{{ $t('components.admin.twitch.confirmDisableTwitch.title') }}
			</template>
			<template #content>
				<p class="u-pb-md">
					{{ $t('components.admin.twitch.confirmDisableTwitch.description') }}
				</p>
				<p
					v-if="error"
					class="u-pb-md u-text-red"
				>
					{{ error }}
				</p>
			</template>
			<template #actions>
				<button
					class="o-btn o-btn--danger"
					type="submit"
					tabindex="0"
					:disabled="loading"
				>
					{{ $t('components.admin.twitch.confirmDisableTwitch.disable') }}
				</button>
			</template>
		</modal>
	</form>
</template>

<script>
import Modal from '~/components/utils/Modal/Modal.vue'

export default {
	components: {
		Modal
	},

	emits: ['close'],

	data () {
		return {
			error  : false,
			loading: false
		}
	},

	methods: {
		async disable () {
			this.error   = false
			this.loading = true
			const res = await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'configUpdate',
				msg  : { prop: 'useTwitchFeatures', value: false }
			})

			if (res.status === 'ok') {
				this.loading = false
				this.$emit('close')
			} else
				this.error = res.message || this.$t('components.admin.twitch.confirmDisableTwitch.error')
		}
	}
}
</script>
