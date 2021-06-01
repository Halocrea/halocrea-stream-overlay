<template>
	<div class="p-overlay">
		<transition name="u-transition--zoom" mode="out-in">
			<discord-chat
				v-if="showVoiceChat && !switching && !playingAlert"
				:theme="theme"
			/>
		</transition>
		<transition name="u-transition--zoom" mode="out-in">
			<latest-sub-follow
				v-if="canUseTwitch && !switching && !playingAlert"
				:theme="theme"
			/>
		</transition>
		<alerts
			:resources="resources"
			@end-alert="() => playingAlert = false"
			@new-alert="() => playingAlert = true"
		/>
	</div>
</template>

<script src="./index.js"></script>
