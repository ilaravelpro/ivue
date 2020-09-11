import LoadData from "../store/load.func";

const GlobalField = {
    computed() {
        return {
            ...LoadData.computed(),
            _icon() {
                return this.icon || this.getOption('icon');
            },
            styleForField() {
                var $style = '';
                if (this.getOption('field.control_field', true)) $style += 'form-control text-left ';
                if (this._icon && this._icon.prepend) $style += 'border-left-0 border-right-radius-4px ';
                if (this._icon && this._icon.append) $style += 'border-right-0 border-left-radius-4px ';
                if (this.error && typeof (this.error.status) !== 'undefined') $style += ' is-' + this.error.status;
                if (this.getStyle('field')) $style += ' ' + this.getStyle('field');
                return $style;
            },
        }
    },
    methods() {
        return {
            ...LoadData.methods(),
        }
    },
    watch(storeNamespace = 'DataSingle') {
        return {
            ...LoadData.watch(),
            getMask: {
                handler: function (newValue) {
                    if (newValue)
                        if (typeof(newValue.numeric) !== "undefined"){
                            $(this.$refs.input).inputmask('numeric', JSON.parse(JSON.stringify(this.mask.numeric)))
                        } else
                            $(this.$refs.input).inputmask(this.mask)
                },
                deep: true
            },
        }
    },
};

export default GlobalField;
