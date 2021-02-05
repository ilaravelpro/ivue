/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/13/20, 12:56 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

import vueDeepSet from "vue-set-value";
import objectPath from "object-path";

const iPath = {
    get(target, path, none = null) {
        path = String(path)
        var $value = objectPath.get(target, path);
        return $value === false ? false: ($value || none);
    },
    set(target, path, value, options) {
        path = String(path)
        var paths = path.split('.');
        var $dpath = [];
        $.each(paths, function ($i, $v) {
            $dpath.push($v);
            if ($i < paths.length - 1 && objectPath.get(target, $dpath.join('.')) === null) {
                objectPath.del(target, $dpath.join('.'))
                objectPath.set(target, $dpath.join('.'), (_.isNumber($v) ? [] : {}));
            }
        })
        return vueDeepSet(...[target, path, value, options]);
    },
    append(target, path, value, options) {
        path = String(path)
        return this.set(target, path + '.' + Object.keys(this.get(target, path)).length, value, options);
    },
    del(target, path) {
        path = String(path)
        return objectPath.del(target, path);
    }
};

export default iPath;
