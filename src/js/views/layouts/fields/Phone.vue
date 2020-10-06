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
        <template slot="body">
            <i-base-phone v-bind="$props" @change="$emit('change', $event )"></i-base-phone>
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
            fieldIndex: [String, Object],
            icon: Object,
            type: {
                type: String,
                default: 'text'
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
        data() {
            return {
                focusin: () => [],
                focusout: () => [],
            }
        }
    }

</script>
