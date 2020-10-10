<template>
    <i-base
        :label="label"
        :desc.sync="desc"
        :store-namespace="storeNamespace"
        :field-index="fieldIndex"
        :options="options"
        :css="css"
        :value="value"
        :slots="slots"
    >
        <slot slot="label-append" name="label-append"/>
        <slot slot="label-prepend" name="label-prepend"/>
        <slot slot="prepend" name="prepend"/>
        <slot slot="append" name="append"/>
        <template slot="body">
            <i-base-checkbox v-bind="$props" @change="$emit('change', $event )"></i-base-checkbox>
        </template>
    </i-base>
</template>


<script>
    export default {
        name: 'i-checkbox',
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
            slots: Object,
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
