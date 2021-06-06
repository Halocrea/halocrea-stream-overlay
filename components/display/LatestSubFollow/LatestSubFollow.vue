<template>
	<div :class="`c-latest-sub-follow c-latest-sub-follow--${theme} ${showLatestFollow && showLatestSub ? 'c-latest-sub-follow--both' : ''}`">
		<transition
			:name="`u-transition--${transitionDirection}`"
			mode="out-in"
		>
			<div v-show="loaded" class="c-latest-sub-follow__inner">
				<flex
					v-if="showLatestSub"
					:ref="'lastSub'"
					class="c-latest-sub"
				>
					<div v-if="!['ce'].includes(theme)" class="c-latest-sub__star">
						<svg-icon
							name="fa-star"
							class="o-icon o-icon-lg"
						/>
					</div>
					<flex class="c-latest-sub-follow__label" cross="center">
						<svg-icon
							v-if="['ce'].includes(theme)"
							name="fa-star"
							class="o-icon o-icon-lg"
						/>
						<div>
							{{ $t('components.display.latestSubFollow.latestSub') }}
						</div>
					</flex>
					<div class="c-latest-sub-follow__value">
						<span>{{ latestSubscriber ? latestSubscriber.display_name : '' }}</span>
					</div>
				</flex>
				<flex
					v-if="showLatestFollow"
					:ref="'lastFollow'"
					class="c-latest-follow"
				>
					<div v-if="!['ce'].includes(theme)" class="c-latest-follow__heart">
						<svg-icon
							name="fa-heart"
							class="o-icon o-icon-lg"
						/>
					</div>
					<flex class="c-latest-sub-follow__label" cross="center">
						<svg-icon
							v-if="['ce'].includes(theme)"
							name="fa-heart"
							class="o-icon o-icon-lg"
						/>
						<div>
							{{ $t('components.display.latestSubFollow.latestFollower') }}
						</div>
					</flex>
					<div class="c-latest-sub-follow__value">
						<span>{{ latestFollower ? latestFollower.display_name : '' }}</span>
					</div>
				</flex>
			</div>
		</transition>
	</div>
</template>

<script src="./LatestSubFollow.index.js"></script>

<style lang="scss" src="./LatestSubFollow.scss"></style>
<style lang="scss" src="./themes/menu.scss"></style>
<style lang="scss" src="./themes/ce.scss"></style>
<style lang="scss" src="./themes/h2.scss"></style>
<style lang="scss" src="./themes/h2a.scss"></style>
<style lang="scss" src="./themes/h3.scss"></style>
<style lang="scss" src="./themes/odst.scss"></style>
<style lang="scss" src="./themes/reach.scss"></style>
<style lang="scss" src="./themes/h5.scss"></style>
