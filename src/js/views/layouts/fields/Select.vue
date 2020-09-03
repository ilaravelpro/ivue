<template>
    <i-base
        :label="label"
        :desc.sync="desc"
        :store-namespace="storeNamespace"
        :field-index="fieldIndex"
        :options="options"
        :css="css"
    >
        <template slot="body" ref="select">
            <i-base-select v-bind="$props"></i-base-select>
        </template>
    </i-base>
</template>


<script>
    import GlobalField from "../../../handel/functions/field/global.func";

    var storeNamespace = 'DataSingle';

    export default {
        name: 'i-select',
        model: {
            event: 'change'
        },
        props: {
            label: String,
            value: [String, Number, Object, Array],
            placeholder: {
                type: String,
                default: 'Please Select...'
            },
            desc: [String, Number, Object, Array],
            storeNamespace: [String, Object],
            fieldIndex: [String, Object],
            search: Boolean,
            multiple: Boolean,
            actions: Boolean,
            diff: [String, Number, Object, Array],
            release: Function,
            view: Function,
            icon: Object,
            type: {
                type: String,
                default: 'single'
            },
            items: {
                type: [Object, Array],
                default: () => []
            },
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
            ...GlobalField.computed(storeNamespace),
        },
        methods: {
            ...GlobalField.methods(storeNamespace),
        }
    }

</script>
