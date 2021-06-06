<template>
	<div class="c-waiting-screens-tabs">
		<flex
			class="u-w-100 u-mr-md"
			main="stretch"
			cross="center"
		>
			<div
				v-for="category in all"
				:key="category.key"
				:class="{
					'c-waiting-screens-tabs__tab u-flex__item-fluid u-m-md u-p-md': true,
					'c-waiting-screens-tabs__tab--active': current === category.key
				}"
				@click="() => current = category.key"
			>
				{{ category.label }}
			</div>
		</flex>
		<transition name="u-transition--lateral" mode="out-in">
			<template
				v-for="category in all"
			>
				<flex
					v-if="category.key === current"
					:key="category.key"
					direction="column"
					main="center"
				>
					<waiting-screens-messages :screen="category.key" />
					<copy-url-btn
						:last-params="`/waitscreen/${category.key}`"
						class="o-btn--bordered o-btn--big u-mt-lg u-mx-sm"
					>
						{{ $t('components.admin.waitingScreensTabs.copyUrl', { category: category.label}) }}
					</copy-url-btn>
				</flex>
			</template>
		</transition>
	</div>
</template>

<script>
import CopyUrlBtn             from '~/components/utils/CopyUrlBtn/CopyUrlBtn.vue'
import WaitingScreensMessages from '~/components/admin/WaitingScreensMessages/WaitingScreensMessages.vue'

export default {
	components: {
		CopyUrlBtn,
		WaitingScreensMessages
	},

	data () {
		return {
			all    : [
				{ key: 'introMsgs', label: 'Intro' },
				{ key: 'interludeMsgs', label: 'Interlude' },
				{ key: 'outroMsgs', label: 'Outro' }
			],
			current: ''
		}
	},

	created () {
		this.current = this.all[0].key
	}
}
</script>

<style lang="scss">
@import '~assets/styles/global/variables';

.c-waiting-screens-tabs {
	&__tab {
		position   : relative;
		font-weight: bold;

		&::before {
			content         : "";
			position        : absolute;
			bottom          : 0;
			left            : 0;
			width           : 0;
			height          : .4rem;
			background-color: transparent;
			transition      : width .25s $transition-easing;
		}

		&--active::before {
			width           : 100%;
			background-color: var(--color-green);
		}

		&:hover:not(.c-waiting-screens-tabs__tab--active) {
			background-color: rgba(0, 0, 0, .1);
			cursor          : pointer;
		}

		&:active:not(.c-waiting-screens-tabs__tab--active) {
			background-color: rgba(0, 0, 0, .2);
			cursor          : pointer;
		}
	}
}
</style>
