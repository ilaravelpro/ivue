/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 1/28/21, 11:34 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

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
