<template>
    <div>
        <i-form-fields :items="fields" />
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import BaseFrom from "../../../handel/functions/form/base.func";
    export default {
        name: "i-form",
        props: {
            items: [Object, Array],
            storeIndex: {
                type: String,
                default: 'DataSingle'
            }
        },
        computed: {
            ...BaseFrom.computed
        },
    }
</script>
