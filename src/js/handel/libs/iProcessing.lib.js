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
