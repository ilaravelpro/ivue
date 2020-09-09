<template>
    <label
        class="i-checkbox" :class="styleForLabel" data-toggle="tooltip" data-placement="top" :title="label">
        <i-base-checkbox v-bind="$props" @change="$emit('change', $event )"></i-base-checkbox>
        <span class="checkmark fa color-primary"></span>
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
            fieldIndex: [String, Object],
            slots: Object,
            options: {
                type: [Object, Array],
                default: () => []
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
        },
        methods: {
            ...GlobalField.methods()
        }
    }

</script>
