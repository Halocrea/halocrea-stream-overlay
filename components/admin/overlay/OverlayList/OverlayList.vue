<template>
	<flex
		class="c-overlay-list"
		direction="column"
		cross="stretch"
	>
		<btn
			v-for="v in variants"
			:key="v.key"
			:class="{ 'active': selected === v.key }"
			@click="() => selectOverlay(v.key)"
		>
			<div class="u-px-md u-py-sm">
				{{ v.name }}
			</div>
		</btn>
		<!-- eslint-disable -->
		<p
			class="c-overlay-list__end-annotation u-my-md"
			v-html="$t('components.admin.overlay.overlayList.endAnnotation', { url: getBaseUrl, selected: selected })"
		/>
		<!-- eslint-enable -->
	</flex>
</template>

<script>
import { mapGetters } from 'vuex'
import Btn            from '~/components/layout/Btn/Btn.vue'

export default {
	components: {
		Btn
	},

	data () {
		return {
			variants: [
				{ key : 'menu', name: this.$t('components.admin.overlay.overlayList.menuNeutral') },
				{ key : 'ce', name: 'Halo CE / CEA' },
				{ key : 'h2', name: 'Halo 2' },
				{ key : 'h2a', name: 'H2A Multi / H4' },
				{ key : 'h3', name: 'Halo 3' },
				{ key : 'odst', name: 'Halo 3: ODST' },
				{ key : 'reach', name: 'Halo: Reach' },
				{ key : 'h5', name: 'Halo 5 Guardians' },
				{ key : 'infinite', name: 'Halo Infinite (NEW!)' }
			]
		}
	},

	computed: {
		getBaseUrl () {
			return process.env.BASE_URL
		},

		...mapGetters({
			selected: 'config/selectedVoiceChatOverlay'
		})
	},

	methods: {
		async selectOverlay (value) {
			await this.$store.dispatch('$nuxtSocket/emit', {
				label: 'mainSocket',
				evt  : 'configUpdate',
				msg  : { prop: 'selectedVoiceChatOverlay', value }
			})
		}
	}
}
</script>

<style lang="scss">
	.c-overlay-list {
		&__end-annotation {
			font-size : 1.4rem;
			font-style: italic;

			code {
				display       : inline-block;
				width         : auto;
				max-width     : 100%;
				overflow-x    : auto;
				font-style    : normal;
				vertical-align: middle;
				white-space   : nowrap;
			}
		}

		.reach-btn-wrapper.active {
			&::before {
				background-color: var(--color-green);
			}

			& > .reach-btn {
				font-weight: bold;
			}
		}
	}
</style>
