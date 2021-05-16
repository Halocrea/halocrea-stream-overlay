<template>
	<flex wrap="wrap" main="around">
		<div class="o-frostglass u-flex__item-fluid u-p-lg u-m-md">
			<h2>Discord</h2>
			<transition name="u-transition--vertical" mode="out-in">
				<p v-if="!discordBotChannel" class="u-my-md">
					Please select the voice chat for the Discord bot:
				</p>
			</transition>
			<discord-channel-select />
		</div>
		<div class="o-frostglass u-flex__item-fluid u-p-lg u-m-md">
			<latest-follow-sub />
		</div>
	</flex>
</template>

<script src="./index.js"></script>
