<template>
	<div class="c-login u-m-lg u-p-lg u-bordered">
		<h3 class="text-center">
			{{ $t('components.user.login.loginRequired') }}
		</h3>
		<hr>
		<div v-if="errorMessage" class="u-text-red">
			{{ errorMessage }}
		</div>
		<busy-overlay />
		<form @keydown.enter="login" @submit.prevent="login">
			<flex direction="column" main="stretch" cross="center">
				<text-field v-model="email">
					{{ $t('components.user.login.emailAddress') }}
				</text-field>
				<text-field
					v-model="password"
					type="password"
				>
					{{ $t('components.user.login.password') }}
				</text-field>
				<div class="u-mt-lg u-text-align--center">
					<button class="o-btn o-btn--big o-btn--primary" type="submit">
						{{ $t('components.user.login.login') }}
					</button>
				</div>
			</flex>
		</form>
	</div>
</template>

<script src="./Login.index.js"></script>

<style lang="scss">
@import '~assets/styles/global/variables';

.c-login {
	background-color: rgba(0, 0, 0, .25);
	border          : .1rem solid rgba(255, 255, 255, .25);
	box-shadow      : $subtle-box-shadow;
	backdrop-filter : blur(3rem);
}
</style>
