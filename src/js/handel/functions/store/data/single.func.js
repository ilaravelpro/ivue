import StoreDataSingleState from "./single/state.func";

const StoreDataSingle = {
    initialState() {
        return {
            resource: null,
            item: {},
            parent: {},
            data: {},
            masks: {},
            options: {
                search: {
                    icon: {
                        prepend: {
                            class: 'trh-icon-sliders cursor-pointer',
                        },
                        append: {
                            class: 'trh-icon-search'
                        }
                    }
                },
            },
            desc: {},
            errors: {
                user: {},
                system: {},
            },
            loading: false,
            fields: [],
        }
    },
    getters: {
        iRecord: state => state.item,
        iParent: state => state.parent,
        iData: state => state.data,
        iErrorAll: state => {
            return {...state.errors.user, ...state.errors.system};
        },
        iErrors: state => state.errors,
        iMaskAll: state => state.masks,
        iDescAll: state => state.desc,
        iOptionAll: state => state.options,
        iLoading: state => state.loading,
        iFields: state => state.fields,
    },
    actions: {
        updateByKey({commit, state, dispatch}, [key, value]) {
            return commit('setState', {key: "item." + key, value: value})
        },
        storeData({commit, state, dispatch}) {

        },
        fetchData({commit, dispatch}, url) {
            return dispatch('fetchDataBy', {url: url, resource: 'item', parent: true})
        },
        fetchDataBy({commit, dispatch}, {url, resource, params, parent}) {
            commit('setLoading', true)
            return new Promise((resolve, reject) => {
                ApiService.get(url, params)
                    .then(response => {
                        commit('setState', {key: resource, value: response.handel.data})
                        if (parent && response.handel.parent) commit('setState', {
                            key: 'parent',
                            value: response.handel.parent
                        })
                        resolve(response.handel.data)
                    })
                    .catch(error => {
                        commit('setState', {key: 'errors.system', value: error})
                        reject(error)
                    })
                    .finally(() => {
                        commit('setLoading', false)
                    })
            })
        },
        setError({commit, state, dispatch}, [key, value]) {
            return commit('setState', {key: 'errors.user.' + key, value: value})
        },
        addError({commit, state, dispatch}, error) {
            return commit('addState', {key: 'errors.user', value: error})
        },
        delError({commit, state, dispatch}, error) {
            return commit('delState', 'errors.user.' + error)
        },
        setOption({commit, state, dispatch}, [key, value]) {
            return commit('setState', {key: 'options.' + key, value: value})
        },
        addOption({commit, state, dispatch}, option) {
            return commit('addState', {key: 'options', value: option})
        },
        delOption({commit, state, dispatch}, option) {
            return commit('delState', 'options.' + option)
        },
        setMask({commit, state, dispatch}, [key, value]) {
            return commit('setState', {key: 'options.' + key, value: value})
        },
        addMask({commit, state, dispatch}, mask) {
            return commit('addState', {key: 'options', value: mask})
        },
        delMask({commit, state, dispatch}, mask) {
            return commit('delState', 'options.' + mask)
        },
        setDesc({commit, state, dispatch}, [key, value]) {
            return commit('setState', {key: 'options.' + key, value: value})
        },
        addDesc({commit, state, dispatch}, desc) {
            return commit('addState', {key: 'options', value: desc})
        },
        delDesc({commit, state, dispatch}, desc) {
            return commit('delState', 'options.' + desc)
        },
        resetState({commit}) {
            commit('resetState')
        }
    },
    mutations: {
        setState(state, {key, value}) {
            return iPath.set(state, key, value)
        },
        addState(state, {key, value}) {
            return iPath.append(state, key, value)
        },
        delState(state, key) {
            return iPath.del(state, key)
        },
        setLoading(state, loading) {
            return iPath.set(state, 'loading', loading)
        },
        resetState(state) {
            state = Object.assign(state, StoreDataSingleState)
        }
    }
};

export default StoreDataSingle;
