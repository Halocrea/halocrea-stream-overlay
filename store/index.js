export const getters = {
	isLoggedIn: state => state.auth.loggedIn
}

export const actions = {
	async nuxtServerInit ({ commit }, { $axios }) {
		// We need to determine whether or not we currently have a valid token for Twitch,
		// and we want to get this info before anything else is loaded
		try {
			const { data } = await $axios.get('/api/public-twitch/validate')
			if (data === 'OK')
				commit('twitch/setTwitchAuth', true)
		} catch (e) {
			commit('twitch/setTwitchAuth', false)
		}

		// we retrieve if possible the latest follower and subscriber
		try {
			const configResult = await $axios.get('/api/public-config/')
			if (configResult.data)
				commit('config/setConfig', configResult.data)
		} catch (e) {
			console.warn(e)
		}

		// // we retrieve if possible the latest follower and subscriber
		try {
			const latestResult = await $axios.get('/api/private-twitch/latest-follow-sub')
			if (latestResult.data.follower)
				commit('twitch/setLatestFollower', latestResult.data.follower)
			if (latestResult.data.subscriber)
				commit('twitch/setLatestSubscriber', latestResult.data.subscriber)
		} catch (e) {
			console.warn(e)
		}
	}
}
