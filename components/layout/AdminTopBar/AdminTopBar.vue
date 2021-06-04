<template>
	<flex
		class="c-admin-topbar u-px-md u-py-xs"
		main="between"
		cross="center"
	>
		<button
			class="c-admin-topbar__toggle o-btn"
			@click="() => open = !open"
		>
			<svg-icon
				:name="open ? 'x': 'menu'"
				class="o-icon o-icon-lg"
			/>
		</button>
		<user-display-config
			:class="{ 'c-user-display-config--open': open }"
		/>
		<flex cross="center">
			<copy-url-btn
				last-params="/overlay"
				class="o-btn--bordered o-btn--big u-mx-sm"
			>
				Copy overlay's URL for OBS
			</copy-url-btn>
			<user-info />
		</flex>
	</flex>
</template>

<script src="./AdminTopBar.index.js"></script>

<style lang="scss" src="./AdminTopBar.scss"></style>
