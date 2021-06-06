<template>
	<flex
		class="base-layout"
		direction="column"
		main="between"
		cross="center"
	>
		<background />
		<div />
		<transition
			name="u-transition--lateral"
			mode="out-in"
		>
			<Nuxt />
		</transition>
		<site-footer />
	</flex>
</template>

<script>
import Background from '~/components/layout/Background/Background.vue'
import SiteFooter from '~/components/layout/SiteFooter/SiteFooter.vue'

export default {
	components: {
		Background,
		SiteFooter
	}
}
</script>

<style lang="scss">
.base-layout {
	width           : 100vw;
	height          : 100vh;
	background-color: var(--color-base);

	.c-site-footer {
		position: relative;
		z-index: 1;
	}
}
</style>
