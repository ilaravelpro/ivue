<template>
    <i-base
        :label="label"
        :desc.sync="desc"
        :store-namespace="storeNamespace"
        :field-index="fieldIndex"
        :options="options"
        :css="css"
        v-on:update:focusin="focusin = $event"
        v-on:update:focusout="focusout = $event"
    >
        <template slot="body" ref="autocomplete">
            <i-base-autocomplete v-bind="$props"  @change="$emit('change', $event )" :focusin="focusin" :focusout="focusout"></i-base-autocomplete>
        </template>
    </i-base>
</template>


<script>
    import GlobalField from "../../../handel/functions/field/global.func";

    var storeNamespace = 'DataSingle';

    export default {
        name: 'i-autocomplete',
        model: {
            event: 'change'
        },
        props: {
            label: String,
            value: [String, Number, Object, Array],
            placeholder: {
                type: String,
                default: 'Please Type...'
            },
            desc: [String, Number, Object, Array],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object, Function],
            diff: [String, Number, Object, Array],
            release: [Function, Object],
            view: Function,
            url: [String, Function],
            type: {
                type: String,
                default: 'single'
            },
            items: {
                type: [Object, Array],
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
                default: () =>  {}
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
        },
        data() {
            return {
                focusin: () => [],
                focusout: () => [],
            }
        },
        computed: {
            ...GlobalField.computed(storeNamespace),
        },
        methods: {
            ...GlobalField.methods(storeNamespace),
        }
    }

</script>
