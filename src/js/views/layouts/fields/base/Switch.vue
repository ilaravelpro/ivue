<template>
    <label class="switch" :class="styleForField">
        <input type="checkbox" :checked="checked" :class="{ 'checked': model ? true :false}" @change="changeValue()">
        <span class="slider" :class="styleForSlider"></span>
    </label>
</template>

<script>
    import GlobalField from "../../../../handel/functions/field/global.func";
    import CheckboxField from "../../../../handel/functions/field/checkbox.func";
    import LoadData from "../../../../handel/functions/store/load.func";

    export default {
        name: 'i-base-switch',
        model: {
            event: 'change'
        },
        props: {
            label: String,
            value: [String, Number, Object, Array],
            desc: [String, Number, Object, Array],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object],
            options: {
                type: [Object, Array],
                default: () => []
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
        },
        data() {
            return {
                model: null,
                checked: false
            }
        },
        created() {
            LoadData.setValueOnCreate(this)
        },
        computed: {
            ...GlobalField.computed(),
            ...CheckboxField.computed,
            styleForField() {
                var $style = '';
                if (this.getOption('field.control_field')) $style += 'form-control text-left ';
                if (this._icon && this._icon.prepend) $style += 'border-left-0 border-right-radius-4px ';
                if (this._icon && this._icon.append) $style += 'border-right-0 border-left-radius-4px ';
                if (this.error && typeof (this.error.status) !== 'undefined') $style += ' is-' + this.error.status;
                if (this.getStyle('field')) $style += ' ' + this.getStyle('field');
                return $style;
            },
            styleForSlider() {
                return this.getStyle('slider') ? this.getStyle('slider') : '';
            },
        },
        methods: {
            ...GlobalField.methods(),
            ...CheckboxField.methods
        },
        watch: {
            ...GlobalField.watch(),
            ...CheckboxField.watch
        }
    }
</script>

