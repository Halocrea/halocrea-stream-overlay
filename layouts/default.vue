<template>
	<flex
		class="base-layout"
		main="center"
		cross="center"
	>
		<background />
		<transition
			name="u-transition--lateral"
			mode="out-in"
		>
			<Nuxt />
		</transition>
	</flex>
</template>

<script>
import Background from '~/components/layout/Background/Background.vue'

export default {
	components: {
		Background
	}
}
</script>

<style lang="scss">
.base-layout {
	width           : 100vw;
	height          : 100vh;
	background-color: var(--color-base);
}
</style>
