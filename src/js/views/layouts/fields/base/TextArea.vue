<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 10/10/20, 6:52 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <textarea ref="input" :placeholder="placeholder" v-model="model" :class="styleForTextArea" @focusin="focusin"
              @focusout="focusout"></textarea>
</template>


<script>
    import GlobalField from "../../../../handel/functions/field/global.func";
    import LoadSingleData from "../../../../handel/functions/store/loadSingle.func";

    var storeNamespace = 'DataSingle';

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
            fieldIndex: [String, Object, Function],
            icon: Object,
            focusin: Function,
            focusout: Function,
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
        },
        data() {
            return {
                model: null,
            }
        },
        created() {
            LoadSingleData.setValueOnCreate(this)
        },
        computed: {
            ...GlobalField.computed(storeNamespace),
            styleForTextArea() {
                return this.styleForField + (this.resize ? 'resize-none' : '');
            }
        },
        methods: {
            ...GlobalField.methods(storeNamespace)
        },
        watch: {
            ...GlobalField.watch(storeNamespace),
        }
    }

</script>
