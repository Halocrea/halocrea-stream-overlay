<template>
	<button
		v-if="lastParams.length > 1"
		:class="{
			'o-btn': true,
			'o-btn--primary': copied,
		}"
		@click="copyToClipboard"
	>
		<svg-icon
			v-if="!copied"
			name="clipboard"
			class="o-icon o-icon-sm"
		/>
		<svg-icon
			v-else
			name="check"
			class="o-icon o-icon-sm"
		/>
		<slot />
	</button>
</template>

<script src="./CopyUrlBtn.index.js"></script>
