/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 1/22/21, 7:51 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

const iData = {
    handel(item, temp = null, method = null, except = []) {
        switch (temp) {
            case 'formData':
                let params = new FormData();
                this.toFormData(params, item, '', except);
                if (method) params.set('_method', method);
                return params;
                break;
            default:
                if (method) item['_method'] = method;
                return item;
                break;
        }
    },
    toFormData(params, data, name, except = []) {
        var $this = this;
        name = name || '';
        if (typeof(data) === 'object' && except.indexOf(name) === -1 && !(data instanceof Blob)) {
            $.each(data, function (index, value) {
                if (name === '') {
                    $this.toFormData(params, value, index, except);
                } else {
                    $this.toFormData(params, value, name + '[' + index + ']', except);
                }
            })
        } else {
            if (typeof (data) !== "undefined")
                params.append(name, data);
        }
    }
};

export default iData;
