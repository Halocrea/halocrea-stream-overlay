<template>
	<flex class="p-index u-pt-lg@md-up" wrap="wrap" main="around">
		<flex
			class="u-flex__item-12@sm-down u-flex__item-6@md u-flex__item-4@md-up"
			cross="stretch"
		>
			<div class="o-frostglass u-w-100 u-m-md u-p-lg">
				<h2>Overlay theme</h2>
				<p class="u-my-md">
					Choose the style for the widgets in your overlay:
				</p>
				<overlay-list />
			</div>
		</flex>
		<flex
			class="u-flex__item-12@sm-down u-flex__item-6@md u-flex__item-4@md-up"
			cross="stretch"
		>
			<div class="o-frostglass u-w-100 u-m-md u-p-lg">
				<h2>Discord</h2>
				<transition name="u-transition--lateral" mode="out-in">
					<div v-if="showVoiceChat" key="voice-chat">
						<transition name="u-transition--vertical" mode="out-in">
							<p v-if="!discordBotChannel" class="u-my-md">
								Please select the voice chat for the Discord bot:
							</p>
						</transition>
						<discord-channel-select />
						<transition name="u-transition--vertical" mode="out-in">
							<div
								v-if="discordBotChannel"
								class="u-mt-lg"
							>
								<h4>Currently in channel: </h4>
								<discord-channel-members class="u-mt-md" />
							</div>
						</transition>
						<discord-chat-title class="u-pt-lg" />
					</div>
					<div v-else key="no-voice-chat">
						<p v-if="!discordBotChannel" class="u-my-md u-text-red">
							You need to turn the "voice chat" switch on to enable this feature.
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
						Twitch
					</h2>
					<transition name="u-transition--lateral" mode="out-in">
						<button
							v-if="useTwitchFeatures"
							class="o-btn o-btn--danger"
							@click="() => showDisableTwitch = true"
						>
							Disable
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
							You can choose which alerts you want to get and configure them!
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
							Configure alerts
						</nuxt-link>
					</flex>
					<flex v-else key="dont-use-twitch" direction="column" cross="stretch">
						<p class="u-my-md u-text-align-center">
							Display your latest follower and subscriber, and get Halo-themed alerts for your stream!
						</p>
						<button
							class="o-btn"
							style="background-color: var(--color-twitch)"
							:disabled="!canUseTwitch"
							@click="() => $root.$emit('confirmEnableTwitch')"
						>
							Enable Twitch features
						</button>
						<p
							v-if="!canUseTwitch"
							class="u-my-md u-text-red u-text-align-center"
						>
							The project is missing some configuration so allow this.
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
					Social Links
				</h2>
				<p class="u-my-md u-pb-lg">
					You can set up to 4 social links that will be shown nicely in the overlay.
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
					Waiting screens
				</h2>
				<p class="u-mt-md">
					Please note that, contrary to the other features, each "waiting screen" has its own source URL.
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
