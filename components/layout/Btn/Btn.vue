<template>
	<div
		:class="{
			'reach-btn-wrapper': true,
			cantdo: disabled,
		}"
		@click="e => $emit('click', e)"
	>
		<a
			v-if="link.length > 0"
			:href="link"
			target="_blank"
			:class="{
				'reach-btn reach-btn--white': true,
				clicked: btnClicked,
			}"
		>
			<div>
				<slot />
			</div>
		</a>
		<nuxt-link
			v-else-if="routerLink"
			tag="div"
			:to="routerLink"
			:disabled="disabled"
			:class="{
				'reach-btn': true,
				clicked: btnClicked,
			}"
		>
			<div @mousedown="click">
				<slot />
			</div>
		</nuxt-link>
		<button
			v-else
			:disabled="disabled"
			:class="{
				'reach-btn': true,
				clicked: btnClicked,
			}"
		>
			<div @mousedown="click" @mouseup="$emit('clicked')">
				<slot />
			</div>
		</button>
	</div>
</template>

<script src="./Btn.index.js"></script>

<style lang="scss" src="./Btn.scss"></style>
