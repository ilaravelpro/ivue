<template>
    <div>
        <div v-if="errorAll.errors && errorAll.errors.length" class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Please fix the errors!!!</h4>
            <ul>
                <li v-for="(error, index) in errorAll.errors">{{ error }}</li>
            </ul>
        </div>
        <div class="card">
            <div class="card-body">
                <i-form class="d-flex flex-wrap" :store-namespace="storeNamespace"></i-form>
            </div>
            <div class="card-footer">
                <button type="submit" class="btn btn-primary" @click="submit">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "i-page-create",
        props: {
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            }
        },
        data() {
            return {

            }
        },
        computed: {
            errorAll() {
                return this.$store.getters[this.storeNamespace + '/' + 'iErrorsHandel']
            }
        },
        created() {
            if (typeof(this.$route.params.id) !== 'undefined')
                this.$store.dispatch(this.storeNamespace + '/fetchData', [this.$route.params.id, null])
        },
        destroyed() {
            this.$store.dispatch(this.storeNamespace + '/resetState')
        },
        methods: {
            submit() {
                this.$store.dispatch(this.storeNamespace + '/storeData', [])
            }
        },
        watch: {
            '$route.params.id': {
                handler: function (newValue) {
                    if (newValue !== 'undefined')
                        this.$store.dispatch(this.storeNamespace + '/fetchData', [this.$route.params.id, null])
                },
                deep: true
            }
        }
    }
</script>
