/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 1/24/21, 2:50 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

import ApiService from "./api.service";

const ID_TOKEN_KEY = window.ID_TOKEN_KEY_NAME || "id_token";

export const getToken = () => {
    return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
    ApiService.setBearerToken(getToken())
    ApiService.setAuthorization(null)
    window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
