/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 1/13/21, 2:15 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

const iProcessing = {
    timeouts: {},
    init(name, context, callback, time = 2000){
        var $this = this;
        var timeout = iPath.get(this.timeouts, name)
        if (timeout)
            clearTimeout(timeout.out)
        iPath.set(this.timeouts, name + '.time', new Date().getTime())
        iPath.set(this.timeouts, name + '.out', setTimeout(function () {
            var value = callback(context, iPath.get($this.timeouts, name));
            if (typeof(value) !== "undefined") iPath.set($this.timeouts, name + '.value', value)
        }, time))
    }
};

export default iProcessing;
