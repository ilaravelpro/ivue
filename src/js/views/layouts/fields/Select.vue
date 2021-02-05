<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 10/10/20, 6:52 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

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
            <i-base-select v-bind="$props"  @change="$emit('change', $event )"></i-base-select>
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
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object, Function],
            search: Boolean,
            multiple: Boolean,
            actions: Boolean,
            diff: [String, Number, Object, Array],
            release: [Function, Object],
            view: Function,
            icon: Object,
            url: [String, Function],
            type: {
                type: String,
                default: 'single'
            },
            items: {
                type: [Object, Array, Function],
                default: () => []
            },
            firstItems: {
                type: [Object, Array],
                default: () => []
            },
            options: {
                type: [Object, Array, Function],
                default: () => []
            },
            query: {
                type: [Object, Array, Function],
                default: () => {}
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
        },
        computed: {
            ...GlobalField.computed(),
        },
        methods: {
            ...GlobalField.methods(),
        }
    }

</script>
