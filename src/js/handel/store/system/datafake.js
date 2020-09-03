function initialState() {
    return {
        data_fake: {
            show: {
                black_page: false,
                menu: false,
                filter: false
            },
            searches: {

            }
        },
    }
}

const getters = {
    options: state => state.options,
}

const actions = {

}

const mutations = {

}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
