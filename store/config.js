import Vue from 'vue'

export const state = () => ({
	config      : {
		discordBotChannel       : '',
		isStreamOn              : false,
		limitMembersShown       : 8,
		selectedVoiceChatOverlay: 'menu',
		showLatestFollow        : true,
		showLatestSub           : true,
		showTwitchAlerts        : true,
		showVoiceChat           : true,
		useTwitchFeatures       : true
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
	showVoiceChat           : state => state.config.showVoiceChat,
	useTwitchFeatures       : state => state.config.useTwitchFeatures
}

export const mutations = {
	setConfig (state, config) {
		for (const prop in config) {
			if (({}).hasOwnProperty.call(config, prop))
				Vue.set(state.config, prop, config[prop])
		}
	},

	setStreamStatus (state, status) {
		state.config.isStreamOn = status
	}
}
