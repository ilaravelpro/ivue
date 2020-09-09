const LoadData = {
    computed() {
        return {
            iRecord() {
                return this.$store.getters[this.storeNamespace + '/' + 'iRecord']
            },
            iMaskAll() {
                return this.$store.getters[this.storeNamespace + '/' + 'iMaskAll']
            },
            iDescAll() {
                return this.$store.getters[this.storeNamespace + '/' + 'iDescAll']
            },
            iErrorAll() {
                return this.$store.getters[this.storeNamespace + '/' + 'iErrorAll']
            },
            iOptionAll() {
                return this.$store.getters[this.storeNamespace + '/' + 'iOptionAll']
            },
            iStyleAll() {
                return this.$store.getters[this.storeNamespace + '/' + 'iStyleAll']
            },
            _value() {
                return this.model || this.value || null;
            },
        }
    },
    methods() {
        return {
            getIndex(key = 'store') {
                if (typeof (this.fieldIndex) === 'object')
                    return iPath.get(this.fieldIndex, key) || iPath.get(this.fieldIndex, 'store');
                return this.fieldIndex;
            },
            getOption(key, $default = null) {
                var $ioption = iPath.get(this.iOptionAll, this.getIndex('option'));
                $ioption = iPath.get($ioption, key);
                var $option = iPath.get(this.options, key);
                $option = $ioption || $option;
                return $option || $default;
            },
            getStyle(key, $default = null) {
                var $istyles = iPath.get(this.iStyleAll, this.getIndex('style')) || iPath.get(this.iStyleAll, 'global');
                $istyles = iPath.get($istyles, key);
                var $style = iPath.get(this.css, key);
                return $style || $istyles || $default;
            },
            getValue(key) {
                return iPath.get(this.iRecord, key)
            },
            updateValue(key, value) {
                this.$store.dispatch(this.storeNamespace + '/updateByKey', [key, value]);
            },
            delValue(key) {
                this.$store.dispatch(this.storeNamespace + '/delByKey', key);
            },
            getError(key) {
                return iPath.get(this.iErrorAll, key)
            },
            getErrorStatus(key) {
                return iPath.get(this.iErrorAll, key + '.status')
            },
            setError() {
                var $error = this.getError(this.getIndex('error') || this.getIndex('store'));
                if (typeof ($error) !== "undefined" && !_.isEqual(this.error, $error)) {
                    this.error = $error;
                    this.$emit('update:error', $error);
                }
            },
            getMask(name) {
                return iPath.get(this.iMaskAll, name)
            },
            setMask() {
                var mask = this.getMask(this.getIndex('mask') || this.getIndex('store'));
                if (typeof (mask) !== "undefined") this.$emit('update:imask', mask);
            },
            getDesc(name) {
                return iPath.get(this.iDescAll, name)
            },
            setDesc() {
                var $desc = this.getDesc(this.getIndex('desc') || this.getIndex('store'));
                if (typeof ($desc) !== "undefined" && !_.isEqual(this.desc, $desc)) {
                    this.$emit('update:desc', $desc);
                }
            },
            getSlots(name) {
                return this.slots && this.slots[name] ? this.slots[name] : false;
            }
        }
    },
    watch() {
        return {
            ['iRecord']: {
                handler: function (newValue) {
                    if (this.getIndex('get') && this.getOption('store.get', true) && typeof(newValue) !== "undefined") {
                        this.model = this.getValue(this.getIndex('get'));
                    }
                },
                deep: true
            },
            _value: {
                handler: function (newValue, oldValue) {
                    if (this.getIndex('update') &&
                        this.getOption('store.update', true) &&
                        typeof (newValue) !== 'undefined' &&
                        newValue !== oldValue)
                        this.updateValue(this.getIndex('update'), this.model);

                },
                deep: true
            },
            value: {
                handler: function (newValue, oldValue) {
                    if (newValue !== oldValue)
                        this.model = newValue
                },
                deep: true
            },
            model: {
                handler: function (newValue) {
                    if (!(this.getIndex('update') &&
                        this.getOption('store.update', true)) && newValue !== this.value)
                        this.$emit('change', newValue);
                },
                deep: true
            },
            iErrorAll: {
                handler: function () {
                    this.setError();
                },
                deep: true
            },
            iMaskAll: {
                handler: function () {
                    this.setMask();
                },
                deep: true
            },
            iDescAll: {
                handler: function () {
                    this.setDesc();
                },
                deep: true
            },
        }
    },
};

export default LoadData;
