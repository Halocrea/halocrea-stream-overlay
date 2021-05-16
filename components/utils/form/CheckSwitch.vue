<template>
	<div class="o-field__switch">
		<input
			:id="id || defaultId"
			ref="input"
			type="checkbox"
			class="u-visually-hidden"
			:value="value"
			:checked="checked"
			:required="required"
			:disabled="disabled"
			:tabindex="tabindex"
			@input="e => updateValue(e.target.value)"
		>
		<label :for="id || defaultId">
			<slot />
		</label>
	</div>
</template>

<script>
export default {
	props: {
		disabled: {
			type    : Boolean,
			required: false,
			default : false
		},

		checked: {
			type    : Boolean,
			required: false,
			default : false
		},

		id: {
			type	: String,
			required: false,
			default : ''
		},

		required: {
			type    : Boolean,
			required: false,
			default : false
		},

		tabindex: {
			type    : Number,
			required: false,
			default : 0
		},

		value: {
			type    : [String, Number, Boolean, Array],
			required: false,
			default : false
		}
	},

	emits: ['input', 'mouseup', 'mousedown', 'keyup', 'keydown', 'keypress', 'focus', 'blur', 'change'],

	data () {
		return {
			defaultId: ''
		}
	},

	mounted () {
		this.defaultId = `text-field-${this._uid}`

		;['keyup', 'mouseup', 'mousedown', 'keydown', 'keypress', 'focus', 'blur', 'change'].map(event =>
			this.$refs.input.addEventListener(event, $event => this.$emit(event, $event))
		)
	},

	methods: {
		updateValue (value) {
			this.$emit('input', value)
		}
	}
}
</script>
