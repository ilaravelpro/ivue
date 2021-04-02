/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/12/20, 7:19 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

import TokenService from "./token.service";
const $axios = require("./axios.service").default;

$axios.setBaseURL(window.API_URL || "api/v1/");
$axios.setAuthorization(`Bearer ${TokenService.getToken()}`);

const ApiService = {
    ...$axios,
    token: null,
    setBearerToken(token) {
        $axios.setAuthorization(`Bearer ${token}`);
        $axios.setAuthorization(`Bearer ${token}`);
    }
};

export default ApiService;
