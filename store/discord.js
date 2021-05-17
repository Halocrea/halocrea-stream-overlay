export const state = () => ({
	infos: {}
})

export const getters = {
	infos  : state => state.infos,
	members: state => state.infos && state.infos.members ? state.infos.members : []
}

export const mutations = {
	clearInfos (state) {
		state.infos = {}
	},

	setInfos (state, infos) {
		state.infos = infos
	}
}
