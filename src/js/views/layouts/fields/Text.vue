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
            <component v-if="getSlots('text')" :is="getSlots('text')" :value="iRecordValue" :class="iRecordValue"></component>
            <slot v-else-if="$scopedSlots['text']"  :value="iRecordValue" :class="iRecordValue"></slot>
            <div :class="styleForField" v-text="iRecordValue"></div>
        </template>
    </i-base>
</template>


<script>
    import GlobalField from "../../../handel/functions/field/global.func";
    export default {
        name: 'i-text',
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
            useParent: Boolean,
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
        },
        computed: {
            ...GlobalField.computed(),
            styleForField() {
                var $style = '';
                if (this.getOption('field.control_field') !== false) $style += 'form-control text-left';
                if (this._icon && this._icon.prepend) $style += ' border-left-0 border-right-radius-4px';
                if (this._icon && this._icon.append) $style += ' border-right-0 border-left-radius-4px';
                if (this.error && typeof (this.error.status) !== 'undefined') $style += ' is-' + this.error.status;
                if (this.getStyle('field')) $style += ' ' + this.getStyle('field');
                /*if (this.getOption('readonly'))*/ $style += ' readonly';
                return $style;
            },
        },
        methods: {
            ...GlobalField.methods(),
        }
    }

</script>
