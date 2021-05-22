<template>
	<div class="p-overlay">
		<transition name="u-transition--zoom" mode="out-in">
			<discord-chat
				v-if="showVoiceChat && !switching"
				:theme="theme"
			/>
		</transition>
	</div>
</template>

<script src="./index.js"></script>
