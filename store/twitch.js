export const state = () => ({
	twitchAuth: false,
	latest    : {
		follower  : null,
		subscriber: null
	},
	keyLabels: [
		{
			key  : 'bitsAlerts',
			label: 'Bits donation',
			vars : ['{{bits}}', '{{username}}']
		},
		{
			key  : 'followAlerts',
			label: 'New follower',
			vars : ['{{username}}']
		},
		{
			key  : 'hostAlerts',
			label: 'Host',
			vars : ['{{username}}']
		},
		{
			key  : 'raidAlerts',
			label: 'Raid',
			vars : ['{{username}}']
		},
		{
			key  : 'resubAlerts',
			label: 'Subscription renewal',
			vars : ['{{username}}', '{{cumulativeMonths}}']
		},
		{
			key  : 'subAlerts',
			label: 'New subscriber',
			vars : ['{{username}}']
		},
		{
			key  : 'subgiftAlerts',
			label: 'Gift subscription',
			vars : ['{{sender}}', '{{recipient}}']
		}
	]
})

export const getters = {
	isTwitchAuth    : state => state.twitchAuth,
	keyLabels       : state => state.keyLabels,
	latestFollower  : state => state.latest.follower,
	latestSubscriber: state => state.latest.subscriber
}

export const mutations = {
	setLatestFollower (state, follower) {
		state.latest.follower = follower
	},

	setKeyLabels (state, keyLabels) {
		state.keyLabels = keyLabels
	},

	setLatestSubscriber (state, subscriber) {
		state.latest.subscriber = subscriber
	},

	setTwitchAuth (state, twitchAuth) {
		state.twitchAuth = twitchAuth
	}
}
