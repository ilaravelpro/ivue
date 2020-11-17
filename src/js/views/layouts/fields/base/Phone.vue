<template>
    <div class="d-flex flex-wrap input-group">
        <i-base-autocomplete class="col-4" placeholder="Enter Country" :items="countries" v-model="model.country" :release="(country, index) => {return {text: `+${country.code}`, value: country.code}}"/>
        <i-base-input class="col-8" v-model="model.number" placeholder="Enter Mobile"/>
    </div>
</template>


<script>
    import GlobalField from "../../../../handel/functions/field/global.func";
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    import LoadSingleData from "../../../../handel/functions/store/loadSingle.func";
    import Countries from "../../../../handel/data/countries";

    export default {
        name: 'i-base-phone',
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
            focusin: {
                type: Function,
                default: () => []
            },
            focusout: {
                type: Function,
                default: () => []
            },
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
                countries: Countries,
                model: {
                    country: '98',
                    number: ''
                },
                defCountry: 98,
                setNumber: false,
            }
        },
        created() {
            LoadSingleData.setValueOnCreate(this)
        },
        computed: {
            ...GlobalField.computed(),
        },
        methods: {
            ...GlobalField.methods(),
        },
        watch: {
            ...GlobalField.watch(),
        },
    }

</script>
