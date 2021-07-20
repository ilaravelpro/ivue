<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 12/28/20, 11:27 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <i-form-fields :items="getItems" :storeNamespace="storeNamespace" :externalSubmit="externalSubmit" />
</template>

<script>
    import BaseFrom from "../../../handel/functions/form/base.func";
    import GlobalField from "../../../handel/functions/field/global.func";
    export default {
        name: "i-form",
        props: {
            items: [Object, Array],
            resource: String,
            url: String,
            typeForm: String,
            name: String,
            externalSubmit: Function,
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            }
        },
        computed: {
            getItems() {
                return this.fields(this.name);
            },
        },
        created() {
            if (this.resource)this.setState('resource', this.resource)
            if (this.url)this.setState('resource', this.url)
            if (this.typeForm)this.setState('options.typeForm', this.typeForm)
        },
        methods: {
            ...BaseFrom.methods,
            setState(key, value) {
                this.$store.commit(this.storeNamespace + '/setState', {key: key, value: value})
            }
        },
    }
</script>
