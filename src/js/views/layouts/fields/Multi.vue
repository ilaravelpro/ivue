<template>
    <i-base
        :label="label"
        :store-namespace="storeNamespace"
        :field-index="fieldIndex"
        :options="options"
        :icon="icon"
        :css="css"
    >
        <slot slot="label-append" name="label-append"/>
        <slot slot="label-prepend" name="label-prepend"/>
        <slot slot="prepend" name="prepend"/>
        <slot slot="append" name="append"/>
        <template slot="body">
            <template v-for="item in fields">
                <component :is="item.component" v-bind="item.attrs">
                    <template v-if="item.text">{{ item.text }}</template>
                </component>
            </template>
        </template>
    </i-base>
</template>


<script>
    export default {
        name: 'i-multi',
        model: {
            event: 'change'
        },
        props: {
            label: String,
            placeholder: String,
            fields:[Array, Object],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object],
            icon: Object,
            options: {
                type: [Object, Array],
                default: () => []
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
        }
    }
</script>
