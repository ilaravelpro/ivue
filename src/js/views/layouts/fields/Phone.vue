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
        :icon="icon"
        :css="css"
        :value="value"
        v-on:update:focusin="focusin = $event"
        v-on:update:focusout="focusout = $event"
    >
        <slot slot="label-append" name="label-append"/>
        <slot slot="label-prepend" name="label-prepend"/>
        <slot slot="prepend" name="prepend"/>
        <slot slot="append" name="append"/>
        <template slot="input-group">
            <i-base-phone v-bind="$props" @change="$emit('change', $event )"></i-base-phone>
        </template>
    </i-base>
</template>


<script>
    export default {
        name: 'i-phone',
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
            type: {
                type: String,
                default: 'text'
            },
            prefix: {
                type: Boolean,
                default: true
            },
            options: {
                type: [Object, Array, Function],
                default: () => []
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
        }
    }

</script>
