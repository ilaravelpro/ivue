import LoadSingleData from "../store/loadSingle.func";

const GlobalField = {
    computed() {
        return {
            ...LoadSingleData.computed(),
            _icon() {
                return this.icon || this.getOption('icon');
            },
            styleForField() {
                var $style = '';
                if (this.getOption('field.control_field') !== false) $style += 'form-control text-left';
                if (this._icon && this._icon.prepend) $style += ' border-left-0 border-right-radius-4px';
                if (this._icon && this._icon.append) $style += ' border-right-0 border-left-radius-4px';
                if (this.error && typeof (this.error.status) !== 'undefined') $style += ' is-' + this.error.status;
                if (this.getStyle('field')) $style += ' ' + this.getStyle('field');
                return $style;
            },
        }
    },
    methods() {
        return {
            ...LoadSingleData.methods(),
        }
    },
    watch(storeNamespace = 'DataSingle') {
        return {
            ...LoadSingleData.watch(),
            getMask: {
                handler: function (newValue) {
                    if (newValue){
                        if (typeof(newValue.numeric) !== "undefined"){
                            $(this.$refs.input).inputmask('numeric', JSON.parse(JSON.stringify(newValue.numeric)))
                        } else
                            $(this.$refs.input).inputmask(newValue)
                        this.$forceUpdate()
                    }
                },
                deep: true
            },
        }
    },
};

export default GlobalField;
