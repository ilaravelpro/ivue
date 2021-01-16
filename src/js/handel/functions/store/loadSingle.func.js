const LoadSingleData = {
    setValueOnCreate($this) {
        var set = this._setValueOnCreate;
        if ($this.getIndex('store') && $this.getOption('store.get', true) && typeof ($this.getValue($this.getIndex('store'))) !== "undefined" && $this.getValue($this.getIndex('store')) !== null)
            if ($this.iFetched)
                set($this)
            else
                setTimeout(function () {set($this)}, 1)
    },
    _setValueOnCreate($this) {
        if (!_.isEqual($this.model, $this.getValue($this.getIndex('get')))){
            $this.model = $this.getValue($this.getIndex('get'));
        }
    },
    computed() {
        return {
            iRecord() {
                return this.$store.getters[this.storeNamespace + '/' + 'iRecord']
            },
            iParent() {
                return this.$store.getters[this.storeNamespace + '/' + 'iParent']
            },
            iData() {
                return this.$store.getters[this.storeNamespace + '/' + 'iData']
            },
            iRecordValue() {
                return iPath.get(this.$store.getters[this.storeNamespace + '/' + 'iRecord'], this.getIndex('get'))
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
            iTimeout() {
                return this.$store.getters[this.storeNamespace + '/' + 'iTimeout']
            },
            iFetched() {
                return this.$store.getters[this.storeNamespace + '/' + 'iFetched']
            },
            iLoading() {
                return this.$store.getters[this.storeNamespace + '/' + 'iLoading']
            },
            _value() {
                return this.model || this.value || null;
            },
            getFieldIndex() {
                return typeof(this.fieldIndex) === 'function' ? this.fieldIndex(this) : this.fieldIndex;
            },
            getContext() {
                return this;
            },
            getDesc() {
                var desc = this.findDesc(this.getIndex('desc'))
                return this.desc || desc;
            },
            getMask() {
                var mask = this.findMask(this.getIndex('mask'));
                return this.mask || mask;
            },
            getOptions() {
                return  typeof(this.options) === 'function' ? this.options(this) : this.options;
            },
        }
    },
    methods() {
        return {
            getIndex(key = 'store') {
                if (typeof (this.getFieldIndex) === 'object'){
                    return iPath.get(this.getFieldIndex, key) || iPath.get(this.getFieldIndex, 'store');
                }
                return this.getFieldIndex;
            },
            getOption(key, $default = null) {
                var $ioption = iPath.get(this.iOptionAll, this.getIndex('option'));
                $ioption = iPath.get($ioption, key);
                var $option = iPath.get(this.getOptions, key);
                $option = $ioption || $option;
                return $option === false ? false : ($option || $default);
            },
            getStyle(key, $default = null) {
                var $istyles = iPath.get(this.iStyleAll, this.getIndex('style')) || iPath.get(this.iStyleAll, 'global');
                $istyles = iPath.get($istyles, key);
                var $style = iPath.get(this.css, key);
                return $style || $istyles || $default;
            },
            getValue(key, $default) {
                var $value = iPath.get(this.iRecord, key);
                return typeof($value) !== "undefined" ? $value : $default
            },
            getParentValue(key) {
                return iPath.get(this.iParent, key)
            },
            getDataValue(key, none = null) {
                return iPath.get(this.iData, key, none)
            },
            updateValue(key, value) {
                this.$store.dispatch(this.storeNamespace + '/updateByKey', [key, value]);
            },
            updateDataValue(key, value) {
                this.$store.commit(this.storeNamespace + '/setState', {key: 'data.' + key, value: value});
            },
            updateState(key, value) {
                this.$store.commit(this.storeNamespace + '/setState', {key: key, value: value});
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
            findMask(name) {
                return iPath.get(this.iMaskAll, name)
            },
            setMask(key, value) {
                this.$store.dispatch(this.storeNamespace + '/setMask', [key, value]);
            },
            findDesc(name) {
                return iPath.get(this.iDescAll, name)
            },
            setDesc(key, value) {
                this.$store.dispatch(this.storeNamespace + '/setDesc', [key, value]);
            },
            getSlots(name) {
                return this.slots && this.slots[name] ? this.slots[name] : false;
            },
        }
    },
    watch() {
        return {
            iRecordValue: {
                handler: function (newValue, oldValue) {
                    if (this.getIndex('get') && this.getOption('store.get', true) && typeof(newValue) !== "undefined" && !_.isEqual(newValue, oldValue)) {
                        var $this = this;
                        if (this.iFetched)
                            LoadSingleData._setValueOnCreate($this)
                        else
                            setTimeout(function () {LoadSingleData._setValueOnCreate($this)}, 1)
                    }
                },
                deep: true
            },
            _value: {
                handler: function (newValue, oldValue) {
                    if (this.getIndex('update') &&
                        this.getOption('store.update', true) &&
                        typeof (newValue) !== 'undefined' &&
                        (!this.iRecordValue || newValue !== oldValue))
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
        }
    },
};

export default LoadSingleData;
