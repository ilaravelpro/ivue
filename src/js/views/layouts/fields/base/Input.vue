<template>
    <textarea v-if="type === 'textarea'" ref="input" :placeholder="placeholder" v-model="model" :class="styleForTextArea" @focusin="focusin"
              @focusout="focusout"></textarea>
    <input v-else ref="input" v-mask="getMask()" :type="type" :placeholder="placeholder" :value="model" @keyup="changeValue(($event.target.value).replace(/_/gi,''))" :class="styleForField" @focusin="focusin" @focusout="focusout">
</template>


<script>
    import GlobalField from "../../../../handel/functions/field/global.func";

    export default {
        name: 'i-base-input',
        model: {
            event: 'change'
        },
        props: {
            placeholder: String,
            value: [String, Number, Object, Array],
            desc: [String, Number, Object, Array],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object],
            icon: Object,
            focusin: {
                type: Function,
                default: () => []
            },
            focusout: {
                type: Function,
                default: () => []
            },
            resize: Boolean,
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
            mask: [String, Number, Object, Array],
        },
        data() {
            return {
                model: null,
            }
        },
        created() {
            if (this.getIndex('store') && this.getOption('store.get', true) && typeof(this.getValue(this.getIndex('store'))) !== "undefined") {
                this.model = this.getValue(this.getIndex('store'));
            }
        },
        computed: {
            ...GlobalField.computed(),
            styleForTextArea() {
                return this.styleForField + (this.resize ? 'resize-none' : '');
            }
        },
        methods: {
            ...GlobalField.methods(),
            changeValue(v) {
                this.model = v
            }
        },
        watch: {
            ...GlobalField.watch(),
        }
    }

</script>
