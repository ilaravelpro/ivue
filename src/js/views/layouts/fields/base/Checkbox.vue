<template>
    <input type="checkbox"
           :checked="getCheck"
           @change="changeValue"
    />
</template>

<script>
    import GlobalField from "../../../../handel/functions/field/global.func";
    import CheckboxField from "../../../../handel/functions/field/checkbox.func";
    import LoadData from "../../../../handel/functions/store/load.func";

    export default {
        name: 'i-base-checkbox',
        model: {
            event: 'change'
        },
        props: {
            placeholder: String,
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
            ...CheckboxField.computed
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

