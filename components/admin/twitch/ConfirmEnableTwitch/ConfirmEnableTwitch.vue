<template>
	<form @submit.prevent="enable">
		<modal
			:overlay-close="true"
			max-width="sm"
			@close="() => $emit('close')"
		>
			<template #title>
				Enable Twitch features
			</template>
			<template #content>
				<p>
					To benefit from the Twitch features, you must authorize the app to access a some information on your Twitch account (subscribers, followers).
				</p>
				<p class="u-pb-md">
					<strong>Important: </strong> Make sure you setup this app to use the same email address as your Twitch account.
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
					class="o-btn o-btn--primary"
					type="submit"
					tabindex="0"
					:disabled="loading"
				>
					Confirm
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
				this.error = res.message || 'An error occured :( Please try again later or contact us.'
		}
	}
}
</script>
