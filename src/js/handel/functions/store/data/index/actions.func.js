/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 1/28/21, 11:38 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

const StoreDataIndexActions = {
    fetchData({commit, state, dispatch}, page = 1) {
        commit('setLoading', true)
        return new Promise((resolve, reject) => {
            ApiService.get(state.url ? state.url : state.resource, {page:page, ...state.query})
                .then(response => {
                    if (page > 1){
                        commit('setState', ['all', [...state.all, ...response.handel.data]])
                        commit('setState', ['total', response.handel.meta.total])
                        commit('setState', ['meta', response.handel.meta])
                    }else
                        commit('setAll', response.handel)
                    if (iPath.get(state.configs, 'fetchDataAll') === true && response.handel.meta.last_page > response.handel.meta.current_page)
                        dispatch('fetchData', response.handel.meta.current_page + 1)
                    resolve(response.handel)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        })

    },
    fetchStatus({commit, state, dispatch}, url = null) {
        return new Promise((resolve, reject) => {
            ApiService.get(url ? url : 'data/statuses/' + state.resource)
                .then(response => {
                    commit('setState', ['statuses', response.handel.data])
                    resolve(response.handel)
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
