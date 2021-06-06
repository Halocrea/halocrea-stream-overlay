<template>
	<transition name="u-transition--lateral" mode="out-in">
		<button
			v-if="!loading"
			:class="{
				'c-user-info o-btn u-px-md menu-prevent-closing': true,
				'o-btn--opaque c-user-info--open': open
			}"
			@click="() => open = !open"
		>
			<flex cross="center">
				<img
					v-if="avatar"
					:src="avatar"
					class="c-user-info__avatar u-mr-md"
				>
				<p>{{ username }}</p>
				<svg-icon
					name="chevron-down"
					class="o-icon o-icon-md c-user-info__chevron u-ml-md"
				/>
			</flex>
			<flex
				class="c-user-info__menu u-py-md u-pr-md"
				direction="column"
				cross="stretch"
			>
				<btn
					v-if="useTwitchFeatures"
					class="u-mr-sm"
					:link="`https://twitch.tv/${username}`"
				>
					<svg-icon
						name="twitch"
						class="o-icon o-icon-md u-m-sm"
					/>
					{{ $t('components.user.userInfo.goToChannel') }}
				</btn>
				<btn :link="'https://discord.gg/74UAq84'" class="u-mr-sm">
					<svg-icon
						name="life-buoy"
						class="o-icon o-icon-md u-m-sm"
					/>
					{{ $t('components.user.userInfo.plzHelp') }}
				</btn>
				<btn
					class="u-mr-sm"
					@click="logout"
				>
					<svg-icon
						name="power"
						class="o-icon o-icon-md u-m-sm"
					/>
					{{ $t('components.user.userInfo.logout') }}
				</btn>
			</flex>
		</button>
	</transition>
</template>

<script src="./UserInfo.index.js"></script>

<style lang="scss" src="./UserInfo.scss"></style>
