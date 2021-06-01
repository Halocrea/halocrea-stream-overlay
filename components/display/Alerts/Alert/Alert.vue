<template>
	<div
		:class="{
			'c-alert': true,
			'c-alert--playing': loaded,
		}"
	>
		<div
			class="c-alert__gif-wrapper"
			:style="`background-color: ${color}`"
		>
			<img :src="`/gifs/${gif}`">
		</div>
		<p
			class="c-alert__text"
			:style="`background-color: ${color}; color: ${color}`"
		>
			{{ message }}
		</p>
	</div>
</template>

<script src="./Alert.index.js"></script>

<style lang="scss" src="./Alert.scss"></style>
