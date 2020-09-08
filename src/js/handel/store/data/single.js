import StoreDataSingle from "../../functions/store/data/single.func";

function initialState() {
    return {
        ...StoreDataSingle.initialState()
    }
}

const getters = {
    ...StoreDataSingle.getters
};

const actions = {
    ...StoreDataSingle.actions
};

const mutations = {
    ...StoreDataSingle.mutations,
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
