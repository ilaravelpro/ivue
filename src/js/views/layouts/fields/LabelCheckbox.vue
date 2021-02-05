<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 10/10/20, 7:16 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <label
        class="i-checkbox mb-0" :class="styleForLabel" data-toggle="tooltip" data-placement="top" :title="label">
        <i-base-checkbox v-bind="$props" @change="$emit('change', $event )"></i-base-checkbox>
        <span class="checkmark fa" :class="styleForCheckmark"></span>
    </label>
</template>


<script>

    import GlobalField from "../../../handel/functions/field/global.func";

    export default {
        name: 'i-label-checkbox',
        model: {
            event: 'change'
        },
        props: {
            label: String,
            placeholder: String,
            value: [String, Number, Object, Array],
            desc: [String, Number, Object, Array],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object, Function],
            slots: Object,
            options: {
                type: [Object, Array, Function],
                default: () => {
                    return {
                        field: {
                            control_field: false
                        }
                    }
                }
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
        },
        computed: {
            ...GlobalField.computed(),
            styleForLabel() {
                return this.getStyle('label') ? this.getStyle('label') : '';
            },
            styleForCheckmark() {
                return this.styleForField + " " + this.getOption('color', 'color-primary');
            },
        },
        methods: {
            ...GlobalField.methods()
        }
    }

</script>
