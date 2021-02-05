/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 9/6/20, 10:51 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

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
