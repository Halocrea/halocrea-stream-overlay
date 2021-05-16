export const state = () => ({
	config      : {
		discordBotChannel       : '',
		isStreamOn              : false,
		limitMembersShown       : 8,
		selectedVoiceChatOverlay: 'menu',
		showLatestFollow        : true,
		showLatestSub           : true,
		showTwitchAlerts        : true,
		showVoiceChat           : true
	}
})

export const getters = {
	discordBotChannel       : state => state.config.discordBotChannel,
	isStreamOn              : state => state.config.isStreamOn,
	limitMembersShown       : state => state.config.limitMembersShown,
	selectedVoiceChatOverlay: state => state.config.selectedVoiceChatOverlay,
	showLatestFollow        : state => state.config.showLatestFollow,
	showLatestSub           : state => state.config.showLatestSub,
	showTwitchAlerts        : state => state.config.showTwitchAlerts,
	showVoiceChat           : state => state.config.showVoiceChat
}

export const mutations = {
	setConfig (state, config) {
		state.config = config
	},

	setStreamStatus (state, status) {
		state.config.isStreamOn = status
	}
}
