<template>
	<div class="p-overlay">
		<!--test-->
		<img
			src="/test.png"
			style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh"
		>
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
	</div>
</template>

<script src="./index.js"></script>
