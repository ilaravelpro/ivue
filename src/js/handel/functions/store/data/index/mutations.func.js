import StoreDataIndexState from "./state.func";

const StoreDataIndexMutations ={
    setAll(state, items) {
        state.all = items
    },
    setLoading(state, loading) {
        state.loading = loading
    },
    setQuery(state, query) {
        state.query = query
    },
    setState(state, [name, value]) {
        iPath.set(state, name, value)
    },
    resetState(state) {
        state = Object.assign(state, StoreDataIndexState())
    }
};

export default StoreDataIndexMutations;
