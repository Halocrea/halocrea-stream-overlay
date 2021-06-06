<template>
	<div>
		<text-field
			v-model="editTitle"
			:disabled="loading"
			@keydown.enter="submit"
			@blur="submit"
		>
			{{ $t('components.admin.discord.chatTitle.name') }}
		</text-field>
		<p v-if="error" class="u-my-md u-text-red">
			{{ error }}
		</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import TextField      from '~/components/utils/form/TextField.vue'

export default {
	components: {
		TextField
	},

	data () {
		return {
			editTitle: '',
			error    : false,
			loading  : false
		}
	},

	computed: {
		...mapGetters({
			voiceChatTitle: 'config/voiceChatTitle'
		})
	},

	watch: {
		voiceChatTitle (val) {
			this.editTitle = this.voiceChatTitle
		}
	},

	created () {
		this.editTitle = this.voiceChatTitle
	},

	methods: {
		async submit () {
			if (this.editTitle === this.voiceChatTitle)
				return

			this.error   = false
			this.loading = true
			try {
				await this.$axios.post('/api/private-discord/title', {
					title: this.editTitle
				})
			} catch (e) {
				this.error = e.response ? e.response.data : e
			}
			this.loading = false
		}
	}
}
</script>
