<template>
	<div class="c-alert-details">
		<flex
			main="between"
			cross="center"
		>
			<div>
				<button
					class="o-btn c-alert-details__btn"
					@click="() => showDetails = !showDetails"
				>
					<svg-icon
						name="chevron-down"
						:class="{
							'c-alert-details__chevron o-icon o-icon-lg u-mr-sm': true,
							'c-alert-details__chevron--flipped': showDetails
						}"
					/>
					{{ label }}
				</button>
				<span
					v-for="v in vars"
					:key="v"
					class="c-alert-details__var u-mx-sm"
				>
					{{ v }}
				</span>
			</div>
			<check-switch
				:checked="enabled"
				@change="e => updateEnabled(e.target.checked)"
			/>
		</flex>
		<p v-if="error" class="u-my-lg u-text-red">
			{{ error }}
		</p>
		<transition name="u-transition--vertical" mode="out-in">
			<flex v-if="showDetails" wrap="wrap">
				<div class="u-flex__item-12@sm-down u-flex__item-6@md u-flex__item-4@md-up u-p-md">
					<h5 class="u-mb-sm">
						{{ $t('components.admin.twitch.alertDetails.messages') }}
					</h5>
					<alert-messages
						:alert-key="alertKey"
						:messages="resources.messages || []"
						@error="val => error = val"
						@loading="val => updating = val"
					/>
				</div>
				<div
					class="u-flex__item-12@sm-down u-flex__item-6@md u-flex__item-4@md-up u-p-md"
				>
					<h5 class="u-mb-sm">
						{{ $t('components.admin.twitch.alertDetails.gifs') }}
					</h5>
					<alert-gifs
						:alert-key="alertKey"
						:gifs="resources.gifs || []"
						@error="val => error = val"
						@loading="val => updating = val"
					/>
				</div>
				<div
					class="u-flex__item-12@sm-down u-flex__item-6@md u-flex__item-4@md-up u-p-md"
				>
					<h5 class="u-mb-sm">
						{{ $t('components.admin.twitch.alertDetails.sounds') }}
					</h5>
					<alert-sounds
						:alert-key="alertKey"
						:sounds="resources.sounds || []"
						@error="val => error = val"
						@loading="val => updating = val"
					/>
				</div>
			</flex>
		</transition>
		<transition name="u-transition--fade" mode="in-out">
			<div v-if="updating" class="c-alert-details__updating" />
		</transition>
	</div>
</template>

<script src="./AlertDetails.index.js"></script>

<style lang="scss" src="./AlertDetails.scss"></style>
