import Vue from 'vue'

export const state = () => ({
	infos: {
		members: []
	}
})

export const getters = {
	infos  : state => state.infos,
	members: state => state.infos && state.infos.members
}

export const mutations = {
	clearInfos (state) {
		state.infos = { members: [] }
	},

	setInfos (state, infos) {
		for (const prop in infos) {
			if (({}).hasOwnProperty.call(infos, prop))
				Vue.set(state.infos, prop, infos[prop])
		}
	}
}
