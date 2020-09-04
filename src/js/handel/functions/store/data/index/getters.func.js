const StoreDataIndexGetters = {
    data: state => state.all,
    total: state => state.all.length,
    meta:          state => state.meta,
    filters:       state => typeof(state.meta.filters) !== "undefined" ? state.meta.filters.allowed : [],
    operators:     state => typeof(state.meta.filters) !== "undefined" ? state.meta.filters.operators : [],
    loading: state => state.loading,
};

export default StoreDataIndexGetters;
