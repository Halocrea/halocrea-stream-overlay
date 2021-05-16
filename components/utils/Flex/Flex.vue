<template>
	<component
		:is="tag"
		:class="`u-flex ${getDirectionClass} ${getWrapClass} ${getMainClass} ${getCrossClass}`"
		@click="$emit('click', $event)"
		@submit="$emit('submit', $event)"
	>
		<slot />
	</component>
</template>

<script src="./Flex.index.js"></script>
