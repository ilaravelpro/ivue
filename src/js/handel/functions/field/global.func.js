const GlobalField = {
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
            _value() {
                return this.model || this.value || null;
            },
            _icon() {
                return this.icon || this.getOption('icon');
            },
            styleForField() {
                var $style = '';
                if (this.getOption('field.control_field', true)) $style += 'form-control text-left ';
                if (this._icon && this._icon.prepend) $style += 'border-left-0 border-right-radius-4px ';
                if (this._icon && this._icon.append) $style += 'border-right-0 border-left-radius-4px ';
                if (this.error && typeof (this.error.status) !== 'undefined') $style += ' is-' + this.error.status;
                return $style;
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
                return $ioption || $option || $default;
            },
            getStyle(key) {
                return iPath.get(this.css, key);
            },
            getValue(key) {
                return iPath.get(this.iRecord, key)
            },
            updateValue(key, value) {
                this.$store.dispatch(this.storeNamespace + '/updateByKey', [key, value]);
            },
            getError(key) {
                return iPath.get(this.iErrorAll, key)
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
        }
    },
    watch(storeNamespace = 'DataSingle') {
        return {
            ['iRecord.'+this.storeIndex]: {
                handler: function (newValue) {
                    if (this.getIndex('store') && this.getOption('store.get') && typeof(newValue) !== "undefined") {
                        this.model = this.getValue(this.getIndex('store'));
                    }
                },
                deep: true
            },
            _value: {
                handler: function (newValue, oldValue) {
                    if (this.getIndex('store') &&
                        this.getOption('store.update', true) &&
                        typeof (newValue) !== 'undefined' &&
                        newValue !== oldValue)
                        this.updateValue(this.getIndex('store'), this.model);

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
                    if (!(this.getIndex('store') &&
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

export default GlobalField;
