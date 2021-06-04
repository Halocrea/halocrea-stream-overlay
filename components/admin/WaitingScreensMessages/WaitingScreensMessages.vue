<template>
	<div class="u-w-100">
		<flex
			v-for="(item, index) in getMsgs"
			:key="`row-${index}`"
			main="stretch"
			cross="center"
			class="u-w-100 u-mt-lg u-pt-md"
		>
			<text-field
				v-model="editLines[index]"
				class="c-waiting-screens-msgs__textfield u-flex__item-fluid u-mr-md"
			>
				Message
			</text-field>
			<button
				type="button"
				class="o-btn o-btn--warning u-mr-md"
				:disabled="editLines[index] === item"
				@click="() => updateMessage(index)"
			>
				Update
			</button>
			<button
				type="button"
				class="o-btn o-btn--danger"
				@click="() => removeMessage(index)"
			>
				Remove
			</button>
		</flex>
		<flex
			v-if="editLines.length < 4"
			main="stretch"
			cross="center"
			class="u-w-100 u-mt-lg u-pt-md"
			tag="form"
			@submit.prevent="addMessage"
		>
			<text-field
				v-model="newLine"
				class="c-waiting-screens-msgs__textfield u-flex__item-fluid u-mr-md"
			>
				Message
			</text-field>
			<button
				type="submit"
				class="o-btn o-btn--primary"
				:disabled="!newLine"
			>
				Add
			</button>
		</flex>
	</div>
</template>

<script src="./WaitingScreensMessages.index.js"></script>

<style lang="scss" src="./WaitingScreensMessages.scss"></style>
