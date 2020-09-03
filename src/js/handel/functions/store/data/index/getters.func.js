const StoreDataIndexGetters = {
    data: state => state.all,
    total: state => state.all.length,
    loading: state => state.loading,
};

export default StoreDataIndexGetters;
