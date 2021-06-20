/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/8/20, 7:13 AM
 * Copyright (c) 2021. Powered by iamir.net
 */
const prefix = 'iauth/session/';
const ID_TOKEN_KEY = window.ID_TOKEN_KEY_NAME || "id_token";
const iAuthService = {
    sessions: {},
    create(session, data) {
        return new Promise((resolve, reject) => {
            return ApiService.post(prefix + session, data, true)
                .then(response => {
                    iPath.set(this.sessions, session + ".configs", iPath.get(response, 'handel.additional'))
                    resolve(response);
                })
                .catch(response => {
                    reject(response);
                });
        });
    },
    verify(session, pin, data) {
        return new Promise((resolve, reject) => {
            return ApiService.post(prefix + session + "/" + iPath.get(this.sessions, session + ".configs.session_key") + (pin ? "/" + pin : '') , data, true)
                .then(response => {
                    resolve(response);
                })
                .catch(response => {
                    reject(response);
                });
        });
    },
    revoke(session, key = null) {
        return new Promise((resolve, reject) => {
            key = iPath.get(this.sessions, session + ".configs.session_key", key);
            return ApiService.delete(prefix + session + (key ? "/" + key : ''), true)
                .then(response => {
                    resolve(response);
                })
                .catch(response => {
                    reject(response);
                });
        });
    }
};

export default iAuthService;
