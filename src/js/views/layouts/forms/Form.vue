<template>
    <i-form-fields :items="fields" />
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import BaseFrom from "../../../handel/functions/form/base.func";
    export default {
        name: "i-form",
        props: {
            items: [Object, Array],
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            }
        },
        computed: {
            ...BaseFrom.computed
        },
    }
</script>
