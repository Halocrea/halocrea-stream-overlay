<template>
	<form @submit.prevent="enable">
		<modal
			:overlay-close="true"
			max-width="sm"
			@close="() => $emit('close')"
		>
			<template #title>
				{{ $t('components.admin.twitch.confirmEnableTwitch.title') }}
			</template>
			<template #content>
				<p>
					{{ $t('components.admin.twitch.confirmEnableTwitch.description') }}
				</p>
				<!-- eslint-disable -->
				<p
					class="u-pb-md"
					v-html="$t('components.admin.twitch.confirmEnableTwitch.notice')"
				/>
				<!-- eslint-enable -->
				<p
					v-if="error"
					class="u-pb-md u-text-red"
				>
					{{ error }}
				</p>
			</template>
			<template #actions>
				<button
					class="o-btn o-btn--primary"
					type="submit"
					tabindex="0"
					:disabled="loading"
				>
					{{ $t('components.admin.twitch.confirmEnableTwitch.confirm') }}
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
		async enable () {
			this.error   = false
			this.loading = true
			const res = await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'configUpdate',
				msg  : { prop: 'useTwitchFeatures', value: true }
			})
			if (res.status === 'ok') {
				this.loading = false
				this.$emit('close')
				window.location.reload()
			} else
				this.error = res.message || this.$t('components.admin.twitch.confirmEnableTwitch.error')
		}
	}
}
</script>
