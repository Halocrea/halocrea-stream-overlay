/* ***** USAGE *******
 *
 * <flex
 *   cross="baseline || center || end || start || stretch" (default start)
 *   direction="row || column || row-reverse || column-reverse" (default row)
 *   main="around || between || center || end || start || stretch" (default start)
 *   tag="%htmltag%" (default div)
 *   wrap="wrap || wrap-reverse || nowrap" (default wrap)
 * >
 *     Your content
 * </flex>
 */
export default {
	props: {
		tag: {
			type    : String,
			required: false,
			default : 'div'
		},

		cross: {
			type     : String,
			required : false,
			default  : 'normal',
			validator: v => ['baseline', 'center', 'end', 'normal', 'start', 'stretch'].includes(v)
		},

		direction: {
			type     : String,
			required : false,
			default  : 'row',
			validator: v => ['row', 'column', 'row-reverse', 'column-reverse'].includes(v)
		},

		main: {
			type     : String,
			required : false,
			default  : 'normal',
			validator: v => ['around', 'between', 'center', 'end', 'normal', 'start', 'stretch'].includes(v)
		},

		wrap: {
			type     : String,
			required : false,
			default  : 'nowrap',
			validator: v => ['nowrap', 'wrap', 'wrap-reverse'].includes(v)
		}
	},

	computed: {
		getCrossClass () {
			return `u-flex-cross-${this.cross}`
		},

		getDirectionClass () {
			switch (this.direction) {
				case 'column':
					return 'u-flex-column'
				case 'column-reverse':
					return 'u-flex-column-reverse'
				default:
					return ''
			}
		},

		getMainClass () {
			return `u-flex-main-${this.main}`
		},

		getWrapClass () {
			switch (this.wrap) {
				case 'wrap':
					return 'u-flex-wrap'
				case 'wrap-reverse':
					return 'u-flex-wrap-reverse'
				default:
					return ''
			}
		}
	}
}
