import StoreDataSingleState from "./single/state.func";
import iData from "../../../libs/iData.lib";
import Notify from "../../../plugins/notify.plugin";

const StoreDataSingle = {
    handelErrors(errors = null, status = true, system = null) {
        var render = [];
        $.each(errors, function (i, v) {
            if (typeof (v.status) !== 'undefined' && v.status === 'invalid') {
                status = false;
                render.push(v.text);
            } else {
                var $child = this.handelErrors(v, status)
                render.push(...$child.errors)
                status = $child.status
            }
        });
        if (system && system.errors)
            render.push(...Object.values(system.errors).map((value, index) => {
                return Object.values(system.errors).join(', ')
            }))
        return {errors: render, status: status};
    },
    initialState() {
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
                system: {errors: {}},
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
        iErrors: state => state.errors.user,
        iErrorsHandel: (state) => StoreDataSingle.handelErrors(state.errors.user, true, state.errors.system),
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
        storeData({commit, state, dispatch, getters}, [url, redirect]) {
            commit('setLoading', true)
            return new Promise((resolve, reject) => {
                if (getters.iErrorsHandel.status) {
                    url = url || state.url || state.resource;
                    let params = iData.handel(state.item, state.options.typeForm, (state.item.id ? 'put' : null), state.options.excepts)
                    if (state.item.id) url += '/' + state.item.id;
                    ApiService.post(url, params, true).then(response => {
                        commit('setState', {key: 'errors.system', value: {}})
                        if (redirect !== false && appRouter.currentRoute.name === state.resource + '.create'){
                            commit('setState', {key: 'item', value: response.handel.data})
                            appRouter.push({name: state.resource + '.edit', params: {id: response.handel.data.id}})
                        }
                        resolve(response)
                    }).catch(error => {
                        commit('setState', {key: 'errors.system', value: error.handel})
                        reject(error)
                    }).finally(() => {
                        commit('setLoading', false)
                    });
                } else {
                    Notify({message: 'Please fix the errors!!!'}, {type: 'd'})
                    reject()
                    commit('setLoading', false)
                }
            })
        },
        fetchData({state, commit, dispatch}, [id, url]) {
            url = url || state.url || state.resource;
            if (id) url += '/' + id;
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
            state = Object.assign(state, StoreDataSingleState())
        }
    }
};

export default StoreDataSingle;
