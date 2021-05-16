<template>
	<div>
		<flex
			class="overlay-layout"
			main="center"
			cross="center"
		>
			<transition
				name="u-transition--lateral"
				mode="out-in"
			>
				<Nuxt />
			</transition>
		</flex>
		<client-only>
			<socket-client />
		</client-only>
	</div>
</template>

<script>
import SocketClient from '~/components/utils/SocketClient.vue'
export default {
	components: {
		SocketClient
	}
}
</script>

<style lang="scss">
.base-layout {
	width : 100vw;
	height: 100vh;
}
</style>
