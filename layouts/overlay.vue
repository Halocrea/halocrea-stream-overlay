<template>
	<div>
		<flex
			:class="{
				'overlay-layout': true,
				'overlay-layout--opaque': opaqueBackground
			}"
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
	},

	data () {
		return {
			opaqueBackground: false
		}
	},

	created () {
		this.opaqueBackground = this.$route.query.opaque
	}
}
</script>

<style lang="scss">
@import '~/assets/styles/global/settings';

.overlay-layout {
	width : 100vw;
	height: 100vh;

	&--opaque {
		background-color: var(--color-base-1);
	}
}
</style>
