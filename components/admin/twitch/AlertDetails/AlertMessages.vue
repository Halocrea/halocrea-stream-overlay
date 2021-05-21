<template>
	<flex
		ref="messages"
		direction="column"
		cross="center"
	>
		<text-field
			v-for="(m, i) in editMessages"
			:key="`message-${i}`"
			:value="editMessages[i]"
			class="c-alert-details__message-field u-mt-md"
			@keydown.enter="e => updateMessage(i, e.target)"
			@input="v => $set(editMessages, i, v)"
			@blur="() => updateMessage(i)"
		/>
		<button
			class="o-btn o-btn--bordered o-btn--big u-w-100 u-mt-md"
			@click="addMessage"
		>
			<svg-icon
				name="plus-square"
				class="o-icon o-icon-md u-mr-sm"
			/>
			Add a message
		</button>
	</flex>
</template>

<script>
import TextField from '~/components/utils/form/TextField.vue'

export default {
	components: {
		TextField
	},

	props: {
		alertKey: {
			type    : String,
			required: true
		},

		messages: {
			type    : Array,
			required: true
		}
	},

	emits: ['loading', 'error'],

	data () {
		return {
			editMessages: []
		}
	},

	watch: {
		messages: {
			immediate: true,
			handler (val) {
				this.editMessages = JSON.parse(JSON.stringify(val))
			}
		}
	},

	methods: {
		addMessage () {
			this.editMessages.push('')
			this.$nextTick(() => {
				const textFields = this.$refs.messages.$el.querySelectorAll('input[type="text"]')
				textFields[textFields.length - 1].focus()
			})
		},

		async updateMessage (index, target = null) {
			if (this.messages[index] && this.messages[index] === this.editMessages[index]) // if unchanged, do nothing
				return

			if (target)
				target.blur()

			this.$emit('error', false)
			this.$emit('loading', true)
			try {
				if (!this.editMessages[index]) { // if empty on submit, we delete
					if (index < this.messages.length)
						await this.$axios.delete(`/api/private-resources/message/${this.alertKey}/${index}`)
					this.editMessages.splice(index, 1)
				} else if (index >= this.messages.length) { // this is a new message
					await this.$axios.post(`/api/private-resources/message/${this.alertKey}`, {
						message: this.editMessages[index]
					})
				} else {
					await this.$axios.patch(`/api/private-resources/message/${this.alertKey}/${index}`, {
						message: this.editMessages[index]
					})
				}
			} catch (e) {
				this.$emit('error', e.response ? e.response.data : e)
			}
			this.$emit('loading', false)
		}
	}
}
</script>
