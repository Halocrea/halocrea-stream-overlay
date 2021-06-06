<template>
	<div class="c-site-footer u-py-lg">
		<p class="u-text-align-center u-mb-md">
			{{ $t('components.layout.footer.madeBy') }}
		</p>
		<hr>
		<flex
			main="around"
			cross="center"
			class="c-site-footer__links u-pt-md"
		>
			<btn
				link="https://github.com/halocrea"
			>
				<svg-icon
					name="github"
					class="o-icon u-ml-sm"
				/>
			</btn>
			<btn
				link="https://discord.gg/74UAq84"
			>
				<svg-icon
					name="discord"
					class="o-icon u-ml-sm"
				/>
			</btn>
			<btn
				link="https://twitter.com/halocreation"
			>
				<svg-icon
					name="twitter"
					class="o-icon u-ml-sm"
				/>
			</btn>
			<btn
				link="https://youtube.com/halocrea"
			>
				<svg-icon
					name="youtube"
					class="o-icon u-ml-sm"
				/>
			</btn>
			<btn
				link="https://twitch.tv/halocrea"
			>
				<svg-icon
					name="twitch"
					class="o-icon u-ml-sm"
				/>
			</btn>
		</flex>
	</div>
</template>

<script>
import Btn from '~/components/layout/Btn/Btn.vue'

export default {
	components: {
		Btn
	}
}
</script>

<style lang="scss">
.c-site-footer {
	width    : 100%;
	max-width: 32rem;
	margin   : 0 auto;

	&__links {
		margin-left: -1.8rem;
	}

	& a {
		color: var(--font-color-base);
	}
}
</style>
