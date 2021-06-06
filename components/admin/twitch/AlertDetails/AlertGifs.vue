<template>
	<flex
		ref="gifs"
		direction="column"
		cross="stretch"
	>
		<flex
			v-for="(gif, i) in gifs"
			:key="`gif-${i}`"
			cross="center"
			class="u-mt-md"
		>
			<p class="u-flex__item-fluid">
				{{ gif }}
			</p>
			<div class="u-flex__item-none">
				<a
					class="o-btn u-mr-md"
					:href="`${baseURL}/gifs/${gif}`"
					target="_blank"
				>
					<svg-icon
						name="external-link"
						class="o-icon o-icon-md"
					/>
				</a>
				<button
					class="o-btn o-btn--danger"
					@click="() => removeGif(i)"
				>
					<svg-icon
						name="trash-2"
						class="o-icon o-icon-md"
					/>
				</button>
			</div>
		</flex>
		<label class="o-btn o-btn--bordered o-btn--big u-w-100 u-mt-md u-text-align-center">
			<input
				ref="file"
				class="u-visually-hidden"
				type="file"
				accept="image/gif"
				@change="e => addGif(e.target.files)"
			>
			<svg-icon
				name="upload"
				class="o-icon o-icon-md u-mr-sm"
			/>
			{{ $t('components.admin.twitch.alertDetails.alertGifs.upload') }}
		</label>
	</flex>
</template>

<script>
export default {
	props: {
		alertKey: {
			type    : String,
			required: true
		},

		gifs: {
			type    : Array,
			required: true
		}
	},

	emits: ['loading', 'error'],

	data () {
		return {
			sizeLimit: 20971520
		}
	},

	computed: {
		baseURL () {
			return process.env.BASE_URL
		}
	},

	methods: {
		async addGif (files) {
			if (files.length < 1)
				return

			if (files[0].size > this.sizeLimit) { // Limit is 20MB (same serverside oc)
				this.$emit('error', this.$t('components.admin.twitch.alertDetails.alertGifs.error'))
				return
			}

			const formData  = new FormData()
			const extension = files[0].type.split('/').pop() // just to make sure we've got the proper extension
			formData.append('file', files[0], files[0].name.replace(extension, '') + extension.toLowerCase())

			this.$emit('error', false)
			this.$emit('loading', true)

			try {
				await this.$axios.post(
					`/api/private-upload/${this.alertKey}/gif`,
					formData, {
						onUploadProgress: (e) => {
							this.progress = Math.round(e.loaded * 100 / e.total)
						}
					})
			} catch (e) {
				this.$emit('error', e.response ? e.response.data : e)
			}
			this.$emit('loading', false)
		},

		async removeGif (index) {
			this.$emit('error', false)
			this.$emit('loading', true)

			try {
				await this.$axios.delete(`/api/private-resources/gif/${this.alertKey}/${index}`)
			} catch (e) {
				this.$emit('error', e.response ? e.response.data : e)
			}
			this.$emit('loading', false)
		}
	}
}
</script>
