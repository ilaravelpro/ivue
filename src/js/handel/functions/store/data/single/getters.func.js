/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 7/31/20, 6:37 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

const StoreDataSingleGetters = {
    iRecord: state => state.item,
    iParent: state => state.parent,
    iData: state => state.data,
    iErrorAll: state => {return {...state.errors.user, ...state.errors.system};},
    iErrors: state => state.errors,
    iMaskAll: state => state.masks,
    iDescAll: state => state.descs,
    iOptionAll: state => state.options,
    iLoading: state => state.loading,
};

export default StoreDataSingleGetters;
