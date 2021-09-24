<template>
	<flex
		ref="networks"
		:class="`c-social-links c-social-links--${theme} c-social-links--${socialNetworks.length}`"
	>
		<flex
			v-for="(link, index) in socialNetworks"
			:key="`${link.key}-${index}`"
			class="c-social-links__link u-mx-lg"
			cross="center"
		>
			<flex
				class="c-social-links__icon-wrapper u-mr-md"
				main="center"
				cross="center"
				:style="`background-color: ${getColorByKey(link.key)}`"
			>
				<svg-icon
					v-if="!['infinite'].includes(theme)"
					:name="link.key"
					class="o-icon"
				/>
				<img v-else :src="`/social-networks/${link.key}.png`" />
			</flex>
			<span>{{ ['infinite'].includes(theme) ? `${link.key}.com` : '' }}{{ link.value }}</span
			>
		</flex>
	</flex>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	props: {
		theme: {
			type: String,
			required: true
		}
	},

	data () {
		return {
			colors: [
				{ key: 'discord', hex: '#7289da' },
				{ key: 'facebook', hex: '#4267B2' },
				{ key: 'guilded', hex: '#dfba21' },
				{ key: 'instagram', hex: '#ed088e' },
				{ key: 'steam', hex: '#151b43' },
				{ key: 'tiktok', hex: '#000000' },
				{ key: 'twitch', hex: '#4941a5' },
				{ key: 'twitter', hex: '#009eff' },
				{ key: 'website', hex: '#5bc0de' },
				{ key: 'xbox', hex: '#2ca243' },
				{ key: 'youtube', hex: '#cc0000' }
			],
			lastBounceIdx: -1
		}
	},

	computed: {
		...mapGetters({
			socialNetworks: 'config/socialNetworks'
		})
	},

	mounted () {
		setInterval(() => {
			if (!this.$refs.networks || !this.$refs.networks.$el) return

			this.lastBounceIdx =
				this.lastBounceIdx + 1 >= this.socialNetworks.length
					? 0
					: ++this.lastBounceIdx
			const el = this.$refs.networks.$el.querySelectorAll(
				'.c-social-links__link'
			)[this.lastBounceIdx]
			el.classList.add('c-social-links__link--bouncing')
			setTimeout(
				() => el.classList.remove('c-social-links__link--bouncing'),
				3000
			)
		}, 60000)
	},

	methods: {
		getColorByKey (key) {
			return this.colors.find(c => c.key === key).hex
		}
	}
}
</script>

<style lang="scss" src="./SocialNetworks.scss"></style>
