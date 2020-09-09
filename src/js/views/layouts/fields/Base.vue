<template>
    <div :class="styleForSection">
        <label v-if="label" :class="styleForLabel">
            <slot name="label-prepend"/>
            {{ label }}
            <slot name="label-append"/>
        </label>
        <div :class="styleForGroup">
            <slot v-if="$scopedSlots['input-group']" name="input-group"></slot>
            <div v-else class="input-group">
                <template class="input-group-prepend">
                    <slot name="prepend"></slot>
                </template>
                <span v-if="_icon && _icon.prepend" @click="_icon.prepend.action ? _icon.prepend.action() : ()=> []" slot="prepend" ref="icon_prepend" class="input-group-text bg-white border-right-0">
                    <i :class="_icon.prepend.class" aria-hidden="true"></i>
                </span>
                <slot name="body"></slot>
                <span v-if="_icon && _icon.append" @click="_icon.append.action ? _icon.append.action() : ()=> []" slot="append" ref="icon_append" class="input-group-text bg-white border-left-0">
                    <i :class="_icon.append.class" aria-hidden="true"></i>
                </span>
                <template class="input-group-append">
                    <slot name="append"></slot>
                </template>
            </div>
            <span v-if="desc && desc.length > 0" class="form-text text-muted">{{ desc }}</span>
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
