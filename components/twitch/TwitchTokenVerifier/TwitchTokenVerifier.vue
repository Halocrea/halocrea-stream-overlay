<template>
	<div>
		<p v-if="loading">
			Loading
		</p>
		<div v-else-if="error">
			<p>An error occured</p>
			<nuxt-link to="/">
				Back to homepage
			</nuxt-link>
		</div>
	</div>
</template>

<script>
import IdTokenVerifier from 'idtoken-verifier'

// CAREFUL: this is a client-only component
export default {
	props: {
		idToken: {
			type    : String,
			required: true
		}
	},

	emits: ['auth-success'],

	data () {
		return {
			error  : false,
			loading: false
		}
	},

	async mounted () {
		this.loading   = true
		const { data } = await this.$axios.get('https://id.twitch.tv/oauth2/.well-known/openid-configuration')
		const verifier = new IdTokenVerifier({
			audience: process.env.TWITCH_CLIENT_ID,
			issuer  : data.issuer,
			jwksURI : data.jwks_uri
		})
		verifier.verify(this.idToken, null, (err, payload) => {
			if (err)
				this.error = true
			else
				this.$emit('auth-success', payload)
			this.loading = false
		})
	}
}
</script>

<style>
	.container {
		margin: 0 auto;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
</style>
