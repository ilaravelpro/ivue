/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 9/8/20, 6:32 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

import StoreDataIndex from "../../functions/store/data/index.func";

function initialState() {
    return {
        ...StoreDataIndex.initialState()
    }
}

const getters = {
    ...StoreDataIndex.getters
};

const actions = {
    ...StoreDataIndex.actions
};

const mutations = {
    ...StoreDataIndex.mutations,
    resetState(state) {
        state = Object.assign(state, initialState())
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
