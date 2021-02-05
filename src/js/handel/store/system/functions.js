/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 5/9/20, 10:54 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

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
