import Axios from "axios";
import iRequest from "../../libs/iRequest.lib";

const instance = Axios.create();
instance.interceptors.request.use(config => {
    return config
})
instance.interceptors.response.use(response => {
    return response
})
const AxiosService = {
    setBaseURL(url) {
        instance.defaults.baseURL = url;
    },

    setAuthorization(token) {
        instance.defaults.headers.common["Authorization"] = token;
    },

    query(options, notify = false) {
        return new Promise((resolve, reject) => {
            try {
                instance(options)
                    .then(response => {
                        resolve({handel: iRequest.then(response, notify), root: response})
                    })
                    .catch(error => {
                        reject({handel: iRequest.catch(error), root: error})
                    })
            }catch (e) {
                console.log(e)
            }
        })
    },

    get(resource, params = {}, headers = {}, notify = false) {
        return this.query({
            method: 'get',
            url: resource,
            params : params,
            headers : headers,
        }, notify)
    },

    post(resource, data = {}, notify = false, headers = {}, params = {}) {
        return this.query({
            method: 'post',
            url: resource,
            data : data,
            headers : headers,
            params : params,
        }, notify)
    },

    put(resource, data = {}, notify = false, headers = {}, params = {}) {
        return this.query({
            method: 'put',
            url: resource,
            data : data,
            headers : headers,
            params : params,
        }, notify)
    },

    delete(resource, notify = true, params = {}, headers = {}) {
        return this.query({
            method: 'delete',
            url: resource,
            params : params,
            headers : headers,
        }, notify)
    }
};

export default AxiosService;
