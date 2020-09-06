import iRequest from "../../../../libs/iRequest.lib";

const StoreDataIndexActions = {
    fetchData({commit, state}) {
        commit('setLoading', true)
        return new Promise((resolve, reject) => {
            ApiService.get(state.resource, state.query)
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
        ApiService.delete('sections/' + id)
            .then(response => {
                dispatch('fetchData')
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
