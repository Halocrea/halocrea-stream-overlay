<template>
	<div class="c-custom-select__wrapper custom-select-prevent-closing">
		<flex
			:ref="'select'"
			:class="{
				'c-custom-select': true,
				'c-custom-select--open': isOpen,
			}"
			direction="column"
			main="start"
			@click="isOpen = !isOpen"
		>
			<button
				v-for="o in options"
				:key="o.key"
				type="button"
				:class="{
					'c-custom-select__item u-px-sm u-py-n': true,
					'c-custom-select__item--selected': o.key === value,
				}"
				@click="valueChanged(o.key)"
			>
				<span>
					{{ o.label }}
				</span>
			</button>
			<div class="c-custom-select__caret">
				<svg-icon class="o-icon-xl" name="chevron-down" />
			</div>
		</flex>
	</div>
</template>

<script src="./CustomSelect.index.js"></script>

<style lang="scss" src="./CustomSelect.scss"></style>
