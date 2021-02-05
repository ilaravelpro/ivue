/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 1/28/21, 11:30 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

const StoreDataIndexState = () => {
    return {
        resource: '',
        url: '',
        all: [],
        meta: {},
        query: {},
        configs: {},
        statuses: {},
        loading: false,
    }
};

export default StoreDataIndexState;
