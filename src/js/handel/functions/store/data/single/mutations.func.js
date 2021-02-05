/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 7/31/20, 6:50 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

import StoreDataSingleState from "./state.func";

const StoreDataSingleMutations ={
    setState(state, {key, value}) {
        return iPath.set(state, key, value)
    },
    addState(state, {key, value}) {
        return iPath.append(state, key, value)
    },
    delState(state, key) {
        return iPath.del(state, key)
    },
    setLoading(state, loading) {
        return iPath.set(state, 'loading', loading)
    },
    resetState(state) {
        state = Object.assign(state, StoreDataSingleState())
    }
};

export default StoreDataSingleMutations;
