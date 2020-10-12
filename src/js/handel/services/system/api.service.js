import TokenService from "./token.service";
const $axios = require("./axios.service").default;

$axios.setBaseURL("api/v1/");
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
