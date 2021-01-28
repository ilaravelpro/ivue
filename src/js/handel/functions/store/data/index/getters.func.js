const StoreDataIndexGetters = {
    iRecords:       state => state.all,
    iStatuses:       state => state.statuses,
    iTotal:         state => state.all.length,
    iMeta:          state => state.meta,
    iFilterAll:     state => typeof(state.meta.filters) !== "undefined" ? state.meta.filters.allowed : [],
    iOperatorAll:   state => typeof(state.meta.filters) !== "undefined" ? state.meta.filters.operators : [],
    iLoading:       state => state.loading,
};

export default StoreDataIndexGetters;
