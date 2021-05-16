<template>
	<flex
		ref="modalwrapper"
		class="c-modal"
		main="center"
		cross="center"
		@click="e => onClose(overlayClose, e)"
	>
		<flex
			class="c-modal__modal u-m-md u-p-lg js-prevent-modal-close"
			direction="column"
			cross="stretch"
		>
			<h3 class="c-modal__title u-py-sm">
				<slot name="title" />
			</h3>
			<div class="c-modal__content u-py-sm">
				<slot name="content" />
			</div>
			<flex class="c-modal__actions u-pt-lg" main="between">
				<div>
					<button
						class="o-btn o-btn--secondary"
						type="button"
						tabindex="-1"
						@click="() => onClose()"
					>
						Close (Esc)
					</button>
				</div>
				<div>
					<slot name="actions" />
				</div>
			</flex>
		</flex>
	</flex>
</template>

<script src="./Modal.index.js"></script>

<style lang="scss" src="./Modal.scss"></style>
