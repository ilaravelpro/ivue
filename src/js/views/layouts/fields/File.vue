<template>
    <i-base
        :label="label"
        :desc.sync="desc"
        :store-namespace="storeNamespace"
        :field-index="fieldIndex"
        :options="options"
        :icon="icon"
        :css="css"
        v-on:update:focusin="focusin = $event"
        v-on:update:focusout="focusout = $event"
    >
        <slot slot="label-append" name="label-append"/>
        <slot slot="label-prepend" name="label-prepend"/>
        <slot slot="prepend" name="prepend"/>
        <slot slot="append" name="append"/>
        <template v-slot:action="{model, url, multiple}">
            <slot name="action" v-bind:value="model" v-bind:url="url" v-bind:multiple="multiple" />
        </template>
        <template slot="body">
            <i-base-file v-bind="$props"></i-base-file>
        </template>
    </i-base>
</template>


<script>
    export default {
        name: 'i-file',
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
            icon: Object,
            multiple: Boolean,
            btn: {
                type: Boolean,
                default: true
            },
            btnTitle: {
                type: String,
                default: 'Upload'
            },
            options: {
                type: [Object, Array, Function],
                default: () => []
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
        }
    }

</script>
