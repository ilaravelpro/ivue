/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 11/24/20, 4:14 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

function initialState() {
    return {
        rules: null,
    }
}

const getters = {
    rules: state => state.rules,
}

const actions = {
    fetch({ commit }) {
        return new Promise((resolve, reject) => {
            ApiService.get('rules')
            .then(response => {
                commit('setRules', response.handel.data)
                resolve(response.handel.data)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setRules(state, rules) {
        state.rules = rules
    },
    resetState(state) {
        state = Object.assign(state, initialState())
    }
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
