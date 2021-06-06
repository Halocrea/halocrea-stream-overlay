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
		<btn disabled="disabled">
			<div class="u-px-md u-py-sm">
				<i>Halo Infinite (soon!)</i>
			</div>
		</btn>
		<p class="c-overlay-list__end-annotation u-my-md">
			Note: you can force one theme to the OBS source by adding <code>?force=%key%</code> at the end of the URL, like <code>{{ getBaseUrl }}/overlay?force={{ selected }}</code>
		</p>
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
				{ key : 'menu', name: 'Menu/Neutral' },
				{ key : 'ce', name: 'Halo CE / CEA' },
				{ key : 'h2', name: 'Halo 2' },
				{ key : 'h2a', name: 'H2A Multi / H4' },
				{ key : 'h3', name: 'Halo 3' },
				{ key : 'odst', name: 'Halo 3: ODST' },
				{ key : 'reach', name: 'Halo: Reach' },
				{ key : 'h5', name: 'Halo 5 Guardians' }
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
