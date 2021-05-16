<template>
	<div
		v-if="$slots.default"
		class="o-field--with-label"
	>
		<input
			:id="id || defaultId"
			ref="input"
			:type="type"
			class="o-field"
			placeholder=" "
			:value="value"
			:required="required"
			:autocomplete="autocomplete"
			:disabled="disabled"
			tabindex="0"
			@input="e => updateValue(e.target.value)"
		>
		<label :for="id || defaultId">
			<slot />
		</label>
	</div>
	<input
		v-else
		:id="id || defaultId"
		ref="input"
		:type="type"
		class="o-field"
		placeholder=" "
		:value="value"
		:required="required"
		:autocomplete="autocomplete"
		:tabindex="tabindex"
		:disabled="disabled === 'true' || (typeof disabled === 'boolean' && disabled)"
		@input="e => updateValue(e.target.value)"
	>
</template>

<script>
export default {
	props: {
		autocomplete: {
			type    : String,
			required: false,
			default : 'on'
		},

		disabled: {
			type    : [String, Boolean],
			required: false,
			default : false
		},

		id: {
			type	: String,
			required: false,
			default : ''
		},

		placeholder: {
			type    : String,
			required: false,
			default : ' '
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

		type: {
			type	 : String,
			required : false,
			default  : 'text',
			validator: val => ['text', 'number', 'password', 'email'].includes(val)
		},

		value: {
			type    : [String, Number],
			required: false,
			default : ''
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
