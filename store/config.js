import Vue from 'vue'

export const state = () => ({
	config      : {
		canUseTwitch            : false,
		discordBotChannel       : '',
		isStreamOn              : false,
		limitMembersShown       : 8,
		selectedVoiceChatOverlay: 'menu',
		showLatestFollow        : true,
		showLatestSub           : true,
		showTwitchAlerts        : true,
		showVoiceChat           : true,
		useTwitchFeatures       : true,
		voiceChatTitle          : '',
		bitsAlerts              : true,
		followAlerts            : true,
		hostAlerts              : true,
		raidAlerts              : true,
		subAlerts               : true,
		socialNetworks          : [],
		introMsgs               : [],
		interludeMsgs           : [],
		outroMsgs               : []
	}
})

export const getters = {
	alertByType             : state => type => state.config[type],
	canUseTwitch            : state => state.config.canUseTwitch,
	discordBotChannel       : state => state.config.discordBotChannel,
	isStreamOn              : state => state.config.isStreamOn,
	limitMembersShown       : state => state.config.limitMembersShown,
	selectedVoiceChatOverlay: state => state.config.selectedVoiceChatOverlay,
	showLatestFollow        : state => state.config.showLatestFollow,
	showLatestSub           : state => state.config.showLatestSub,
	showTwitchAlerts        : state => state.config.showTwitchAlerts,
	showVoiceChat           : state => state.config.showVoiceChat,
	useTwitchFeatures       : state => state.config.useTwitchFeatures,
	voiceChatTitle          : state => state.config.voiceChatTitle,
	bitsAlerts              : state => state.config.bitsAlerts,
	followAlerts            : state => state.config.followAlerts,
	hostAlerts              : state => state.config.hostAlerts,
	raidAlerts              : state => state.config.raidAlerts,
	subAlerts               : state => state.config.subAlerts,
	socialNetworks          : state => state.config.socialNetworks,
	introMsgs               : state => state.config.introMsgs,
	interludeMsgs           : state => state.config.interludeMsgs,
	outroMsgs               : state => state.config.outroMsgs
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
