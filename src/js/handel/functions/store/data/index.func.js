/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 7/31/20, 6:46 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

import StoreDataIndexState from "./index/state.func";
import StoreDataIndexGetters from "./index/getters.func";
import StoreDataIndexActions from "./index/actions.func";
import StoreDataIndexMutations from "./index/mutations.func";

const StoreDataIndex = {
    initialState() {
        return StoreDataIndexState();
    },
    getters: StoreDataIndexGetters,
    actions: StoreDataIndexActions,
    mutations: StoreDataIndexMutations,
};

export default StoreDataIndex;
