<template>
    <div>
        <div v-if="errorAll.errors && errorAll.errors.length" class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Please fix the errors!!!</h4>
            <ul>
                <li v-for="(error, index) in errorAll.errors">{{ error }}</li>
            </ul>
        </div>
        <div class="d-flex flex-wrap">
            <div v-for="(row , index) in rows" :class="row.class" class="my-2">
                <div class="card">
                    <div v-if="$scopedSlots[`row.${row.name}.header`]" class="card-header">
                        <slot :name="`row.${row.name}.header`" v-bind:row="row" v-bind:namespace="storeNamespace"></slot>
                    </div>
                    <div class="card-body">
                        <loading v-if="row.loading !== false" :status="!loading"/>
                        <slot v-if="$scopedSlots[`row.${row.name}.body`]" :name="`row.${row.name}.body`" v-bind:row="row" v-bind:namespace="storeNamespace"></slot>
                        <i-form v-else class="d-flex flex-wrap" :resource="resource" :url="url" :type-form="typeForm" :name="multiple ? row.name : null" :store-namespace="storeNamespace"></i-form>
                    </div>
                    <div v-if="row.btn !== false" class="card-footer">
                        <slot v-if="$scopedSlots[`row.${row.name}.footer`]" :name="`row.${row.name}.footer`" v-bind:row="row" v-bind:namespace="storeNamespace"></slot>
                        <button v-else type="submit" class="btn btn-primary" @click="submit">Submit</button>
                    </div>
                </div>
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
            },
            rows: {
                type: [Object, Array],
                default: () => {
                    return {
                        general: {
                            title: 'General',
                            name: 'general',
                            class: 'col-xl-12',
                        }
                    }
                }
            },
            multiple: Boolean,
            fetch: {
                type: Boolean,
                default: true
            },
            resource: String,
            url: String,
            typeForm: String,
        },
        data() {
            return {

            }
        },
        computed: {
            errorAll() {
                return this.$store.getters[this.storeNamespace + '/' + 'iErrorsHandel']
            },
            loading() {
                return this.$store.getters[this.storeNamespace + '/' + 'iLoading']
            }
        },
        created() {
            if (typeof(this.$route.params.id) !== 'undefined' && this.fetch !== false)
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
                    if (newValue !== 'undefined' && this.fetch !== false)
                        this.$store.dispatch(this.storeNamespace + '/fetchData', [this.$route.params.id, null])
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>
