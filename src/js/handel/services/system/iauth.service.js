/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/8/20, 7:13 AM
 * Copyright (c) 2021. Powered by iamir.net
 */
const prefix = 'iauth/session/';

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
            return ApiService.post(prefix + session + "/" + iPath.get(this.sessions, session + ".configs.session_key") + "/" + pin , data, true)
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
