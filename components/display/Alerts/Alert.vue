<template>
	<div />
</template>

<script>
export default {
	props: {
		color: {
			type    : String,
			required: true
		},

		gif: {
			type    : String,
			required: true
		},

		sound: {
			type    : String,
			required: true
		},

		text: {
			type    : String,
			required: true
		}
	},

	emits: ['ended'],

	data () {
		return {
			loaded: true
		}
	},

	mounted () {
		const audio     = new Audio(this.item.sound)
		audio.onended   = () => this.$emit('ended')
		audio.addEventListener('canplaythrough', () => {
			this.loaded = true
			audio.play()
		})
	}
}
</script>
