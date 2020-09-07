const StoreDataIndexActions = {
    fetchData({commit, state}) {
        commit('setLoading', true)
        return new Promise((resolve, reject) => {
            ApiService.get(state.url ? state.url : state.resource, state.query)
                .then(response => {
                    commit('setAll', response.handel)
                    resolve(response.handel)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        })

    },
    destroyData({commit, state, dispatch}, id) {
        return new Promise((resolve, reject) => {
            ApiService.delete((state.url ? state.url : state.resource)+ '/' + id)
                .then(response => {
                    dispatch('fetchData')
                })
        })
    },
    setQuery({commit}, value) {
        commit('setQuery', purify(value))
    },
    setState({commit}, [name, value]) {
        commit('setState', [name, value])
    },
    resetState({commit}) {
        commit('resetState')
    }
};

export default StoreDataIndexActions;
