<template>
	<div>
		<checkbox
			class="u-mb-md custom-select-prevent-closing"
			:checked="filter"
			@change="() => filter = !filter"
		>
			{{ $t('components.admin.discord.channelSelect.filter') }}
		</checkbox>
		<custom-select
			:value="discordBotChannel || 'default'"
			:options="options"
			@onchange="joinChannel"
		/>
		<p v-if="error" class="u-text-red">
			{{ error }}
		</p>
		<transition name="u-transition--vertical" mode="out-in">
			<button
				v-if="discordBotChannel"
				class="o-btn o-btn--warning u-w-100 u-mt-md"
				@click="leaveChannel"
			>
				Leave channel
			</button>
		</transition>
	</div>
</template>

<script src="./DiscordChannelSelect.index.js"></script>
