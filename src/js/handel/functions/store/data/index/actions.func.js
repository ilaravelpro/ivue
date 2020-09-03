const StoreDataIndexActions = {
    fetchData({commit, state}) {
        commit('setLoading', true)
        ApiService.get('sections', {params: state.query})
            .then(response => {
                commit('setAll', response.handel.data)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    destroyData({commit, state, dispatch}, id) {
        ApiService.delete('sections/' + id)
            .then(response => {
                dispatch('fetchData')
            })
    },
    setQuery({commit}, value) {
        commit('setQuery', purify(value))
    },
    resetState({commit}) {
        commit('resetState')
    }
};

export default StoreDataIndexActions;
