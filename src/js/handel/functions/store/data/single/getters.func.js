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
