<template>
	<div class="c-voicechan-members">
		<flex
			v-for="m in members"
			:key="m.userID"
			:class="{
				'c-voicechan-members__row u-p-sm': true,
				'c-voicechan-members__row--active': m.speaking
			}"
			cross="center"
			:style="`background-color: #${m.color}`"
		>
			<div
				:class="{
					'c-voicechan-members__avatar-placeholder u-flex__item-none u-mr-md': true,
					'c-voicechan-members__avatar-placeholder--active': m.speaking
				}"
			>
				<img :src="m.avatarURL">
			</div>
			<div
				class="u-flex__item-fluid"
				:style="`color: ${textColor(m.color)}`"
			>
				{{ m.displayName }}
			</div>
		</flex>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters({
			members: 'discord/members'
		})
	},

	methods: {
		textColor (bgColor) {
			const rgb   = parseInt(bgColor, 16) // convert rrggbb to decimal
			const r     = (rgb >> 16) & 0xFF // extract red
			const g     = (rgb >> 8) & 0xFF // extract green
			const b     = (rgb >> 0) & 0xFF // extract blue
			const luma  = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

			if (luma > 150)
				return '#000000'

			return '#ffffff'
		}
	}
}
</script>

<style lang="scss">
	.c-voicechan-members {
		&__avatar-placeholder {
			width        : 3rem;
			height       : 3rem;
			border-radius: 2rem;
			overflow     : hidden;
			border       : .2rem solid transparent;

			&--active {
				border-color: var(--color-green);
			}

			& > img {
				width     : 100%;
				height    : 100%;
				object-fit: cover;
			}
		}

		&__row {
			position     : relative;
			margin-bottom: .2rem;

			& > * {
				position: relative;
				z-index : 1;
			}

			&::after {
				content         : "";
				position        : absolute;
				top             : 0;
				left            : 0;
				width           : 100%;
				height          : 100%;
				background-color: rgba(0, 0, 0, .33);
				opacity         : 1;
				transition      : opacity .15s linear;
			}

			&--active::after {
				opacity: 0;
			}
		}

		&__speaker-placeholder {
			width     : 3rem;
			text-align: center;
		}
	}
</style>
