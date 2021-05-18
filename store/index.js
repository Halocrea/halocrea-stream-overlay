export const getters = {
	isLoggedIn: state => state.auth.loggedIn
}

export const actions = {
	async nuxtServerInit ({ commit }, { $axios }) {
		// We must fetch the user's configuration first
		let configResult
		try {
			configResult = await $axios.get('/api/public-config/')
			if (configResult.data)
				commit('config/setConfig', configResult.data)
		} catch (e) {
			console.warn(e)
		}

		// if the user turned on Twitch features
		if (configResult && configResult.data && configResult.data.useTwitchFeatures) {
			// We need to determine whether or not we currently have a valid token for Twitch,
			// and we want to get this info before anything else is loaded
			try {
				const { data } = await $axios.get('/api/public-twitch/validate')
				if (data === 'OK') {
					commit('twitch/setTwitchAuth', true)

					// just 'pinging' the webhooks endpoint to make sure we do have the proper subscriptions
					// this doesn't need any confirmation
					$axios.get('/api/public-twitch/webhooks')

					// we retrieve if possible the latest follower and subscriber
					const latestResult = await $axios.get('/api/public-twitch/latest-follow-sub')
					if (latestResult.data.follower)
						commit('twitch/setLatestFollower', latestResult.data.follower)
					if (latestResult.data.subscriber)
						commit('twitch/setLatestSubscriber', latestResult.data.subscriber)
				}
			} catch (e) {
				commit('twitch/setTwitchAuth', false)
			}
		}

		// fetching the infos about the current voice channel (if any)
		try {
			const voiceChatInfos = await $axios.get('/api/public-discord/voice-info')
			if (voiceChatInfos.data && voiceChatInfos.data.data)
				commit('discord/setInfos', voiceChatInfos.data.data)
		} catch (e) {
			console.warn(e)
		}
	}
}
