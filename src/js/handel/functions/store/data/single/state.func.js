const StoreDataSingleState = () => {
    return {
        resource: null,
        item: {},
        parent: {},
        data: {},
        masks: {},
        options: {},
        descs: {},
        errors: {
            user: {},
            system: {},
        },
        loading: false,
    }
};

export default StoreDataSingleState;
