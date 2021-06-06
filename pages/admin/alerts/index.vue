<template>
	<div class="p-admin-alerts u-pt-lg@md-up">
		<div class="o-frostglass u-m-lg u-p-lg">
			<div>
				<nuxt-link
					class="o-btn o-btn--bordered"
					to="/"
				>
					<svg-icon
						name="arrow-left"
						class="o-icon o-icon-md"
					/>
					{{ $t('pages.admin.alerts.back') }}
				</nuxt-link>
			</div>
			<h2 class="u-mt-lg u-mb-sm">
				{{ $t('pages.admin.alerts.title') }}
			</h2>
			<p class="u-my-md">
				{{ $t('pages.admin.alerts.description') }}
			</p>
		</div>
		<flex
			v-for="key in Object.keys(resources).filter(k => k !== 'emotes')"
			:key="keyLabels.find(kl => kl.key === key).label"
			class="o-frostglass u-m-lg u-p-lg"
			direction="column"
			cross="stretch"
		>
			<alert-details
				:alert-key="key"
				:resources="resources[key]"
			/>
		</flex>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AlertDetails   from '~/components/admin/twitch/AlertDetails/AlertDetails.vue'

export default {
	components: {
		AlertDetails
	},

	layout    : 'admin',
	middleware: ['auth'],

	validate ({ $auth, redirect }) {
		if (!$auth.loggedIn) redirect('/login')

		return $auth.loggedIn
	},

	async asyncData ({ $axios }) {
		const { data } = await $axios.get(`${process.env.BASE_URL}/api/public-config/resources`)
		return {
			resources: data
		}
	},

	computed: {
		...mapGetters({
			keyLabels   : 'twitch/keyLabels'
		})
	},

	mounted () {
		if (this.$root.mainSocket)
			this.onResourcesUpdated()
		else
			this.$root.$on('mainSocketInit', this.onResourcesUpdated)
	},

	beforeUnmount () {
		this.$root.mainSocket.off('resourcesUpdated', this.onResourcesUpdated)
	},

	methods: {
		onResourcesUpdated () {
			this.$root.mainSocket.on('resourcesUpdated', this.resourcesUpdated)
		},

		resourcesUpdated (resources) {
			this.resources = resources
		}
	}
}
</script>

<style lang="scss">
.p-admin-alerts {
	width       : 100%;
	max-width   : 120rem;
	margin-left : auto;
	margin-right: auto;
}
</style>
