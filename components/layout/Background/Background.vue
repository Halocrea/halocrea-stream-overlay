<template>
	<div class="c-bg-image  c-bg-image--discrete">
		<transition-group
			name="c-bg-image--transition"
			tag="div"
		>
			<div
				v-for="b in bgArr"
				:key="b"
				class="c-bg-image__inner"
			>
				<div
					ref="background"
					class="c-bg-image__bg"
					:style="`background-image: url(${b})`"
				/>
			</div>
		</transition-group>
	</div>
</template>

<script src="./Background.index.js"></script>

<style lang="scss" src="./Background.scss"></style>
