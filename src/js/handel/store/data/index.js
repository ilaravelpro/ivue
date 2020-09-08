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
