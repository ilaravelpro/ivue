<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 10/10/20, 8:22 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div :class="styleForSection">
        <label v-if="label" :class="styleForLabel">
            <component v-if="getSlots('label-prepend')" :is="getSlots('label-prepend')" :store-namespace="storeNamespace"></component>
            <slot v-else name="label-prepend"/>
            {{ label }}
            <component v-if="getSlots('label-append')" :is="getSlots('label-append')" :store-namespace="storeNamespace"></component>
            <slot v-else name="label-append"/>
        </label>
        <div :class="styleForGroup">
            <slot v-if="$scopedSlots['input-group']" name="input-group"></slot>
            <div v-else class="input-group" :class="getStyle('input-group')">
                <template class="input-group-prepend">
                    <component v-if="getSlots('prepend')" :is="getSlots('prepend')" :store-namespace="storeNamespace"></component>
                    <slot v-else name="prepend"></slot>
                </template>
                <span v-if="_icon && _icon.prepend" @click="_icon.prepend.action ? _icon.prepend.action(getContext) : ()=> []" slot="prepend" ref="icon_prepend" class="input-group-text bg-white border-right-0">
                    <i :class="_icon.prepend.class" aria-hidden="true"></i>
                </span>
                <component v-if="getSlots('body')" :is="getSlots('body')"></component>
                <slot v-else name="body"></slot>
                <span v-if="_icon && _icon.append" @click="_icon.append.action ? _icon.append.action(getContext) : ()=> []" slot="append" ref="icon_append" class="input-group-text bg-white border-left-0">
                    <i :class="_icon.append.class" aria-hidden="true"></i>
                </span>
                <template class="input-group-append">
                    <component v-if="getSlots('append')" :is="getSlots('append')" :store-namespace="storeNamespace"></component>
                    <slot v-else name="append"></slot>
                </template>
            </div>
            <span v-if="getDesc && getDesc.length > 0" class="form-text text-muted">{{ getDesc }}</span>
        </div>
    </div>
</template>


<script>
    import GlobalField from "../../../handel/functions/field/global.func";
    import BaseField from "../../../handel/functions/field/base.func";
    var storeNamespace = 'DataSingle';

    export default {
        name: 'i-base',
        props: {
            label: String,
            value: [String, Number, Object, Array],
            desc: [String, Number, Object, Array],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object, Function],
            icon: Object,
            slots: Object,
            options: {
                type: [Object, Array, Function],
                default: () => []
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
        },
        created() {
            this.$emit('update:focusin', this.focusin)
            this.$emit('update:focusout', this.focusout)
        },
        computed: {
            ...GlobalField.computed(storeNamespace),
            ...BaseField.computed
        },
        methods: {
            ...GlobalField.methods(storeNamespace),
            ...BaseField.methods
        }
    }

</script>
