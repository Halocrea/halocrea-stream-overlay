export const state = () => ({
	twitchAuth: false,
	latest    : {
		follower  : null,
		subscriber: null
	}
})

export const getters = {
	isTwitchAuth    : state => state.twitchAuth,
	latestFollower  : state => state.latest.follower,
	latestSubscriber: state => state.latest.subscriber
}

export const mutations = {
	setLatestFollower (state, follower) {
		state.latest.follower = follower
	},

	setLatestSubscriber (state, subscriber) {
		state.latest.subscriber = subscriber
	},

	setTwitchAuth (state, twitchAuth) {
		state.twitchAuth = twitchAuth
	}
}
