const StoreDataSingleState = () => {
    return {
        resource: null,
        url: null,
        status: true,
        item: {},
        parent: {},
        data: {},
        masks: {},
        options: {
            excepts: [],
            typeForm: null
        },
        desc: {},
        errors: {
            user: {},
            system: {},
        },
        loading: false,
        fields: [],
    }
};

export default StoreDataSingleState;
