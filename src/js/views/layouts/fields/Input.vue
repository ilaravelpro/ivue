<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 11/9/20, 8:43 PM
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
        :slots="slots"
        v-on:update:focusin="focusin = $event"
        v-on:update:focusout="focusout = $event"
        class="i-input"
    >
        <slot slot="label-append" name="label-append"/>
        <slot slot="label-prepend" name="label-prepend"/>
        <slot slot="prepend" name="prepend"/>
        <slot slot="append" name="append"/>
        <template slot="body">
            <i-base-input v-bind="{...$props, ...$attrs}" @change="$emit('change', $event )" :focusin="focusin" :focusout="focusout"></i-base-input>
        </template>
    </i-base>
</template>


<script>
    export default {
        name: 'i-input',
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
            slots: Object,
            resize: Boolean,
            type: {
                type: String,
                default: 'text'
            },
            options: {
                type: [Object, Array, Function],
                default: () => []
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
            mask: [String, Number, Object, Array],
        },
        data() {
            return {
                focusin: () => [],
                focusout: () => [],
            }
        }
    }

</script>
