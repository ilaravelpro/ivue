function initialState() {
    return {
        data: null
    }
}

const getters = {
    data: state => state.data,
}

const actions = {
    showModal({ commit }, value) {
        commit('showModal', value)
    },
}

const mutations = {
    showModal(state, id){
        $("#"+id).modal('toggle');
    },
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
