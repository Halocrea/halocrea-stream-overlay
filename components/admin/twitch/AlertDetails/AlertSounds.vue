<template>
	<flex
		ref="sounds"
		direction="column"
		cross="stretch"
	>
		<flex
			v-for="(sound, i) in sounds"
			:key="`gif-${i}`"
			cross="center"
			class="u-mt-md"
		>
			<p class="u-flex__item-fluid">
				{{ sound }}
			</p>
			<div class="u-flex__item-none">
				<button
					v-if="playing !== i"
					class="o-btn o-btn--success u-mr-md"
					@click="() => playSound(i)"
				>
					<svg-icon
						name="play-circle"
						class="o-icon o-icon-md"
					/>
				</button>
				<button
					v-else
					class="o-btn o-btn--warning u-mr-md"
					@click="() => stopSound()"
				>
					<svg-icon
						name="stop-circle"
						class="o-icon o-icon-md"
					/>
				</button>
				<button
					class="o-btn o-btn--danger"
					@click="() => removeSound(i)"
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
				accept="audio/mp3"
				@change="e => addSound(e.target.files)"
			>
			<svg-icon
				name="upload"
				class="o-icon o-icon-md u-mr-sm"
			/>
			Upload an mp3 (max. 20Mb)
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

		sounds: {
			type    : Array,
			required: true
		}
	},

	emits: ['loading', 'error'],

	data () {
		return {
			current  : null,
			playing  : -1,
			sizeLimit: 20971520
		}
	},

	computed: {
		baseURL () {
			return process.env.BASE_URL
		}
	},

	methods: {
		async addSound (files) {
			if (files.length < 1)
				return

			if (files[0].size > this.sizeLimit) { // Limit is 20MB (same serverside oc)
				this.$emit('error', 'File is too big')
				return
			}

			const formData  = new FormData()
			formData.append('file', files[0], files[0].name.toLowerCase())

			this.$emit('error', false)
			this.$emit('loading', true)

			try {
				await this.$axios.post(
					`/api/private-upload/${this.alertKey}/sound`,
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

		playSound (index) {
			if (this.current)
				this.current.pause()
			this.current = new Audio(`${this.baseURL}/sounds/${this.sounds[index]}`)
			this.current.addEventListener('ended', this.stopSound)
			this.current.play()
			this.playing = index
		},

		async removeSound (index) {
			this.$emit('error', false)
			this.$emit('loading', true)

			try {
				await this.$axios.delete(`/api/private-resources/sound/${this.alertKey}/${index}`)
			} catch (e) {
				this.$emit('error', e.response ? e.response.data : e)
			}
			this.$emit('loading', false)
		},

		stopSound () {
			this.current = null
			this.playing = -1
		}
	}
}
</script>
