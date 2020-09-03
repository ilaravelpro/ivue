const StoreDataSingleActions = {
    updateByKey({commit, state, dispatch}, [key, value]) {
        return commit('setState', {key: "item."+key, value: value})
    },
    storeData({commit, state, dispatch}) {

    },
    fetchData({commit, dispatch}, url) {
        return dispatch('fetchDataBy', {url: url, resource: 'item', parent: true})
    },
    fetchDataBy({commit, dispatch}, {url, resource, params, parent}) {
        commit('setLoading', true)
        return new Promise((resolve, reject) => {
            ApiService.get(url, params)
                .then(response => {
                    commit('setState', {key: resource, value: response.handel.data})
                    if (parent && response.handel.parent) commit('setState', {key: 'parent', value: response.handel.parent})
                    resolve(response.handel.data)
                })
                .catch(error => {
                    commit('setState', {key: 'errors.system', value: error})
                    reject(error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        })
    },
    setError({commit, state, dispatch}, {key, error}) {
        return commit('setState', {key: 'errors.user.'+key, value: error})
    },
    addError({commit, state, dispatch}, error) {
        return commit('addState', {key: 'errors.user', value: error})
    },
    delError({commit, state, dispatch}, error) {
        return commit('delState', 'errors.user.'+error)
    },
    resetState({commit}) {
        commit('resetState')
    }
};

export default StoreDataSingleActions;
