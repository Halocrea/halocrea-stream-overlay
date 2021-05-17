export const state = () => ({
	infos: {}
})

export const getters = {
	infos: state => state.infos
}

export const mutations = {
	clearInfos (state) {
		state.infos = {}
	},

	setInfos (state, infos) {
		state.infos = infos
	}
}
