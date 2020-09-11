const iProcessing = {
    timeouts: {},
    init(name, context, callback, time = 2000){
        var timeout = iPath.get(this.timeouts, name)
        if (timeout && timeout.time && timeout.time + time > new Date().getTime())
            clearTimeout(timeout.out)
        iPath.set(this.timeouts, name + '.time', new Date().getTime())
        iPath.set(this.timeouts, name + '.out', setTimeout(function () {
            callback(context);
        }, time))
    }
};

export default iProcessing;
