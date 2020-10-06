import Notify from "../../plugins/notify.plugin";
import iAuthService from "../../services/system/iauth.service";

const state = {
    errors: null,
    user: {},
    isAuthenticated: !!TokenService.getToken(),
    prefix: 'iauth/session',
};

const getters = {
    errors: state => state.errors,
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    }
};

const actions = {
    create(context, [type, data]) {
        return iAuthService.create(type, data);
    },
    auth(context, pin) {
        return new Promise((resolve, reject) => {
            iAuthService.verify('auth', pin, {})
                .then(response => {
                    context.commit('setUser', response.handel);
                    resolve(response);
                })
                .catch(response => {
                    context.commit('setError', response.handel.errors);
                    reject(response);
                });
        });
    },
    logout(context) {
        context.commit('logOut');
    },
    verify(context) {
        if (TokenService.getToken()) {
            ApiService.get("me")
                .then(response => {
                    context.commit('setUser', response.handel);
                })
                .catch(({response}) => {
                    context.commit('setError', response.handel.errors);
                    reject(response);
                });
        } else {
            Notify({message: 'Your validation key has expired. Please log in again.'}, {type: 'd'})
            context.commit('logOut');
        }
    },
    update(context, payload) {
        const {email, username, password, image, bio} = payload;
        const user = {email, username, bio, image};
        if (password) {
            user.password = password;
        }
        return ApiService.put("me", user).then(({data}) => {
            context.commit('setUser', data);
            return data;
        });
    }
};

const mutations = {
    setError(state, error) {
        state.errors = error;
    },
    setUser(state, user) {
        state.isAuthenticated = true;
        state.user = user.data;
        state.errors = {};
        TokenService.saveToken(user.additional.token);
        ApiService.setBearerToken(user.additional.token);
    },
    logOut(state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        TokenService.destroyToken();
        appRouter.push({name: 'auth.login'});
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};