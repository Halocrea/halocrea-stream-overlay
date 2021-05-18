<template>
	<form @submit.prevent="disable">
		<modal
			:overlay-close="true"
			max-width="sm"
			@close="() => $emit('close')"
		>
			<template #title>
				Disable Twitch features
			</template>
			<template #content>
				<p class="u-pb-md">
					Are you sure you want to disable all the features related to Twitch, i.e. alerts but also the "latest follower" and "latest subscriber"?
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
					Disable
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
				this.error = res.message || 'An error occured :( Please try again later or contact us.'
		}
	}
}
</script>
