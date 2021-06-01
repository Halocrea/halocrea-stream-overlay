<template>
	<div class="p-overlay">
		<transition name="u-transition--zoom" mode="out-in">
			<discord-chat
				v-if="showVoiceChat && !switching"
				:theme="theme"
			/>
		</transition>
		<transition name="u-transition--zoom" mode="out-in">
			<latest-sub-follow
				v-if="canUseTwitch"
				:theme="theme"
			/>
		</transition>
		<Alerts :resources="resources" />
	</div>
</template>

<script src="./index.js"></script>
