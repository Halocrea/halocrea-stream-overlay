<template>
	<div class="p-oauth-return u-m-md u-p-lg">
		<transition
			name="u-transition--lateral"
			mode="out-in"
		>
			<flex
				v-if="!payload && twitchRes.id_token && twitchRes.access_token"
				key="loading"
				main="center"
				cross="center"
			>
				<client-only>
					<twitch-token-verifier
						:id-token="twitchRes.id_token"
						@auth-success="proceedToLogin"
					/>
				</client-only>
			</flex>
			<flex
				v-else-if="payload && payload.email"
				key="form"
				tag="form"
				direction="column"
				main="center"
				cross="center"
				@submit.prevent="login"
			>
				<img class="p-oauth-return__avatar u-m-sm" :src="payload.picture">
				<p class="u-m-sm">
					{{ payload.preferred_username }}
				</p>
				<p v-if="error" class="u-m-sm">
					{{ error }}
				</p>
				<div class="u-mb-md">
					<text-field
						v-model="password"
						type="password"
					>
						{{ $t('pages.oauth2Return.password') }}
					</text-field>
				</div>
				<button
					class="o-btn o-btn--primary u-m-sm"
					type="submit"
				>
					{{ $t('pages.oauth2Return.login') }}
				</button>
			</flex>
			<flex
				v-else
				key="error"
				main="center"
				cross="center"
			>
				<p>{{ $t('pages.oauth2Return.error') }}</p>
			</flex>
		</transition>
	</div>
</template>

<script src="./index.js"></script>

<style lang="scss" src="./index.scss"></style>
