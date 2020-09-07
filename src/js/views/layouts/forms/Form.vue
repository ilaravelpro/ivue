<template>
    <i-form-fields :items="fields(name)" :storeNamespace="storeNamespace" />
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import BaseFrom from "../../../handel/functions/form/base.func";
    export default {
        name: "i-form",
        props: {
            items: [Object, Array],
            name: String,
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            }
        },
        methods: {
            ...BaseFrom.methods
        },
    }
</script>
