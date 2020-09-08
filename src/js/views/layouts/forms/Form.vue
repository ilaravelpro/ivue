<template>
    <i-form-fields :items="fields(name)" :storeNamespace="storeNamespace" />
</template>

<script>
    import BaseFrom from "../../../handel/functions/form/base.func";
    export default {
        name: "i-form",
        props: {
            items: [Object, Array],
            resource: String,
            url: String,
            typeForm: String,
            name: String,
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            }
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
