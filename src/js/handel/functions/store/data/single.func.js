/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 2/3/21, 11:02 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

import StoreDataSingleState from "./single/state.func";
import iData from "../../../libs/iData.lib";
import Notify from "../../../plugins/notify.plugin";
import vueDeepSet from "vue-set-value";

const StoreDataSingle = {
    handelErrors(errors = null, status = true, system = null) {
        var render = [];
        var $this = this;
        $.each(errors, function (i, v) {
            if (typeof (v.status) !== 'undefined' && v.status === 'invalid') {
                status = false;
                render.push(v.text);
            } else {
                var $child = $this.handelErrors(v, status)
                render.push(...$child.errors)
                status = $child.status
            }
        });
        if (system && system.errors)
            render.push(...Object.values(system.errors).map((value, index) => {
                return Object.values(value).join(', ')
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
                typeForm: null,
                useId: true,
            },
            desc: {},
            styles: {},
            errors: {
                user: {},
                system: {errors: {}},
            },
            loading: false,
            fields: [],
            functions: {},
            configs: {},
            timeout: 0,
            fetched: false
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
        iStyleAll: state => state.styles,
        iTimeout: state => state.timeout,
        iFetched: state => state.fetched,
    },
    actions: {
        updateByKey({commit, state, dispatch}, [key, value]) {
            var old = iPath.get(state, "item." + key)
            var oldState = state
            var $commit = commit('setState', {key: "item." + key, value: value})
            if (typeof(state.functions['afterUpdateByKey']) === 'function') setTimeout(function () {
                state.functions['afterUpdateByKey'](key, state, dispatch, commit, old, oldState)
            }, 15)
            return $commit;
        },
        delByKey({commit, state, dispatch}, key) {
            return commit('delState', 'item.' + key)
        },
        storeData({commit, state, dispatch, getters}, [url, redirect, method = null]) {
            commit('setLoading', true)
            return new Promise((resolve, reject) => {
                if (getters.iErrorsHandel.status) {
                    url = url || state.url || state.resource;
                    url = url.replace('{id}', state.item.id)
                    let params = iData.handel(state.item, state.options.typeForm, (method || (typeof(state.item.id) !== "undefined"? 'put' : null)), state.options.excepts)
                    if (state.item.id && state.options.useId) url += '/' + state.item.id;
                    if (state.functions['onChangeUrl']) url = state.functions['onChangeUrl'](url, state, dispatch, commit)
                    ApiService.post(url, params, true).then(response => {
                        commit('setStateMain', {key: 'errors.system', value: {}})
                        if (response.handel.data && redirect !== false && appRouter.currentRoute.name === state.resource + '.create'){
                            commit('setState', {key: 'item', value: response.handel.data})
                            appRouter.push({name: state.resource + '.edit', params: {id: response.handel.data.id}})
                        }
                        resolve(response)
                    }).catch(error => {
                        commit('setStateMain', {key: 'errors.system', value: error.handel})
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
            url = String(url).replace('{id}', id)
            if (id && state.options.useId) url += '/' + id;
            if (state.functions['onFetchUrl']) url = state.functions['onFetchUrl'](url, state, dispatch, commit)
            return dispatch('fetchDataBy', {url: url, resource: 'item', parent: true, func: 'afterFetch'})
        },
        fetchDataBy({commit, state, dispatch}, {url, resource, params, parent, func}) {
            commit('setLoading', true)
            return new Promise((resolve, reject) => {
                ApiService.get(url, params)
                    .then(response => {
                        commit('setStateMain', {key: resource, value: response.handel.data})
                        if (parent && response.handel.parent) commit('setStateMain', {
                            key: 'parent',
                            value: response.handel.parent
                        })
                        if (state.functions[func]) state.functions[func](response.handel, state, dispatch, commit)
                        if (resource === 'item')
                            setTimeout(function () {
                                state.fetched = true
                            }, 100)
                        resolve(response.handel.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
                    .finally(() => {
                        setTimeout(function () {
                            commit('setLoading', false)
                        }, 1)
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
            return commit('setState', {key: 'masks.' + key, value: value})
        },
        addMask({commit, state, dispatch}, mask) {
            return commit('addState', {key: 'masks', value: mask})
        },
        delMask({commit, state, dispatch}, mask) {
            return commit('delState', 'masks.' + mask)
        },
        setDesc({commit, state, dispatch}, [key, value]) {
            return commit('setState', {key: 'desc.' + key, value: value})
        },
        addDesc({commit, state, dispatch}, desc) {
            return commit('addState', {key: 'desc', value: desc})
        },
        delDesc({commit, state, dispatch}, desc) {
            return commit('delState', 'desc.' + desc)
        },
        setState({commit}, [name, value]) {
            commit('setState', [name, value])
        },
        resetState({commit}) {
            iProcessing.timeouts = {}
            commit('resetState')
        }
    },
    mutations: {
        setState(state, {key, value}) {
            iProcessing.init(key, [state, key, value], function (context, timeout) {
                if (timeout && (typeof(timeout.value) === "undefined" || !_.isEqual(timeout.value, value))){
                    iPath.set(...context)
                    return value;
                }
            }, 10)
            return true
        },
        setStateMain(state, {key, value}) {
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
            $.each({
                status: true,
                item: {},
                parent: {},
                data: {},
                masks: {},
                options: {
                    excepts: [],
                    typeForm: null,
                },
                desc: {},
                styles: {},
                errors: {
                    user: {},
                    system: {errors: {}},
                },
                loading: false,
                timeout: 0,
                fetched: false
            }, function (key, value) {
                iPath.set(state, key, value)
            })
        }
    }
};

export default StoreDataSingle;
