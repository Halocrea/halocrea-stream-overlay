<template>
	<div class="c-alerts">
		<div
			:class="{
				'c-alerts__cinemascope': true,
				'c-alerts__cinemascope--active': !!current && current.cinemascope
			}"
		/>
		<alert
			v-if="current"
			:key="`alert-${Math.random()}`"
			:color="current.color"
			:gif="current.gif"
			:message="current.message"
			:sound="current.sound"
			@ended="onEndAlert"
		/>
	</div>
</template>

<script src="./Alerts.index.js"></script>

<style lang="scss" src="./Alerts.scss"></style>
