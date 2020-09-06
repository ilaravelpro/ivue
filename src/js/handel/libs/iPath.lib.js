import vueDeepSet from "vue-set-value";
import objectPath from "object-path";

const iPath = {
    get(target, path, none = null) {
        return objectPath.get(target, path) || none;
    },
    set(target, path, value, options) {
        return vueDeepSet(target, path, value, options);
    },
    append(target, path, value, options) {
        return this.set(target, path+'.'+Object.keys(this.get(target, path)).length, value, options);
    },
    del(target, path) {
        return objectPath.del(target, path);
    }
};

export default iPath;
