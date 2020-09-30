import vueDeepSet from "vue-set-value";
import objectPath from "object-path";

const iPath = {
    get(target, path, none = null) {
        return objectPath.get(target, path) || none;
    },
    set(target, path, value, options) {
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
        return this.set(target, path + '.' + Object.keys(this.get(target, path)).length, value, options);
    },
    del(target, path) {
        return objectPath.del(target, path);
    }
};

export default iPath;
