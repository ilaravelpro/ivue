import StoreDataIndexState from "./state.func";

const StoreDataIndexMutations ={
    setAll(state, handel) {
        state.all = handel.data
        state.total = handel.meta.total;
        state.meta = handel.meta;
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
