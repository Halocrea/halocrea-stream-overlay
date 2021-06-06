<template>
	<flex class="p-index u-pt-lg@md-up" wrap="wrap" main="around">
		<flex
			class="u-flex__item-12@sm-down u-flex__item-6@md u-flex__item-4@md-up"
			cross="stretch"
		>
			<div class="o-frostglass u-w-100 u-m-md u-p-lg">
				<h2>{{ $t('pages.index.overlayThemeTitle') }}</h2>
				<p class="u-my-md">
					{{ $t('pages.index.overlayThemeDescription') }}
				</p>
				<overlay-list />
			</div>
		</flex>
		<flex
			class="u-flex__item-12@sm-down u-flex__item-6@md u-flex__item-4@md-up"
			cross="stretch"
		>
			<div class="o-frostglass u-w-100 u-m-md u-p-lg">
				<h2>{{ $t('pages.index.discordTitle') }}</h2>
				<transition name="u-transition--lateral" mode="out-in">
					<div v-if="showVoiceChat" key="voice-chat">
						<transition name="u-transition--vertical" mode="out-in">
							<p v-if="!discordBotChannel" class="u-my-md">
								{{ $t('pages.index.discordDescription') }}
							</p>
						</transition>
						<discord-channel-select />
						<transition name="u-transition--vertical" mode="out-in">
							<div
								v-if="discordBotChannel"
								class="u-mt-lg"
							>
								<h4>{{ $t('pages.index.discordCurrent') }}</h4>
								<discord-channel-members class="u-mt-md" />
							</div>
						</transition>
						<discord-chat-title class="u-pt-lg" />
					</div>
					<div v-else key="no-voice-chat">
						<p v-if="!discordBotChannel" class="u-my-md u-text-red">
							{{ $t('pages.index.discordDisabled') }}
						</p>
					</div>
				</transition>
			</div>
		</flex>
		<flex
			class="u-flex__item-12@sm-down u-flex__item-4@md u-flex__item-4@md-up"
			cross="stretch"
		>
			<div class="o-frostglass u-w-100 u-m-md u-p-lg">
				<flex main="between" cross="center">
					<h2 class="u-mb-sm">
						{{ $t('pages.index.twitchTitle') }}
					</h2>
					<transition name="u-transition--lateral" mode="out-in">
						<button
							v-if="useTwitchFeatures"
							class="o-btn o-btn--danger"
							@click="() => showDisableTwitch = true"
						>
							{{ $t('pages.index.twitchDisable') }}
						</button>
					</transition>
				</flex>
				<transition name="u-transition--lateral" mode="out-in">
					<flex
						v-if="useTwitchFeatures"
						key="use-twitch"
						direction="column"
						cross="stretch"
					>
						<p class="u-my-md">
							{{ $t('pages.index.twitchDescription') }}
						</p>
						<alert-list />
						<nuxt-link
							class="o-btn o-btn--big o-btn--bordered u-mt-lg u-text-align-center"
							:to="{
								name: 'admin-alerts'
							}"
						>
							<svg-icon
								name="settings"
								class="o-icon o-icon-md u-mr-sm"
							/>
							{{ $t('pages.index.twitchConfigure') }}
						</nuxt-link>
					</flex>
					<flex v-else key="dont-use-twitch" direction="column" cross="stretch">
						<p class="u-my-md u-text-align-center">
							{{ $t('pages.index.twitchEnableText') }}
						</p>
						<button
							class="o-btn"
							style="background-color: var(--color-twitch)"
							:disabled="!canUseTwitch"
							@click="() => $root.$emit('confirmEnableTwitch')"
						>
							{{ $t('pages.index.twitchEnableButton') }}
						</button>
						<p
							v-if="!canUseTwitch"
							class="u-my-md u-text-red u-text-align-center"
						>
							{{ $t('pages.index.twitchMissingConfig') }}
						</p>
					</flex>
				</transition>
			</div>
		</flex>
		<flex
			class="u-flex__item-12@sm-down u-flex__item-8@md u-flex__item-6@md-up"
			cross="stretch"
		>
			<div class="o-frostglass u-w-100 u-m-md u-p-lg">
				<h2 class="u-mb-sm">
					{{ $t('pages.index.socialLinksTitle') }}
				</h2>
				<p class="u-my-md u-pb-lg">
					{{ $t('pages.index.socialLinksDescription') }}
				</p>
				<social-networks />
			</div>
		</flex>
		<flex
			class="u-flex__item-12@sm-down u-flex__item-12@md u-flex__item-6@md-up"
			cross="stretch"
		>
			<div class="o-frostglass u-w-100 u-m-md u-p-lg">
				<h2 class="u-mb-sm">
					{{ $t('pages.index.waitingScreensTitle') }}
				</h2>
				<p class="u-mt-md">
					{{ $t('pages.index.waitingScreensDescription') }}
				</p>
				<waiting-screens-tabs />
			</div>
		</flex>
		<transition name="u-transition--fade" mode="out-in">
			<confirm-disable-twitch
				v-if="showDisableTwitch"
				@close="() => showDisableTwitch = false"
			/>
		</transition>
	</flex>
</template>

<script src="./index.js"></script>

<style lang="scss">
.p-index {
	width       : 100%;
	max-width   : 192rem;
	margin-left : auto;
	margin-right: auto;
}
</style>
