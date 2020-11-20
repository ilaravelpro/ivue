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
    >
        <slot slot="label-append" name="label-append"/>
        <slot slot="label-prepend" name="label-prepend"/>
        <slot slot="prepend" name="prepend"/>
        <slot slot="append" name="append"/>
        <template slot="body">
            <i-base-tag v-bind="$props" @change="$emit('change', $event )" :focusin="focusin" :focusout="focusout"></i-base-tag>
        </template>
    </i-base>
</template>


<script>
    export default {
        name: 'i-tag',
        model: {
            event: 'change'
        },
        props: {
            label: String,
            id: String,
            url: String,
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
            items: {
                type: [Object, Array, Function],
                default: () => []
            }
        },
        data() {
            return {
                focusin: () => [],
                focusout: () => [],
            }
        }
    }

</script>
