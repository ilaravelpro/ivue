<template>
    <input type="checkbox"
           :checked="getCheck"
           @change="changeValue"
    />
</template>

<script>
    import GlobalField from "../../../../handel/functions/field/global.func";

    export default {
        name: 'i-base-checkbox',
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
            options: {
                type: [Object, Array],
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
                checked: false
            }
        },
        created() {
            if (this.getIndex('store') && this.getOption('store.get', true) && typeof(this.getValue(this.getIndex('store'))) !== "undefined") {
                this.model = this.getValue(this.getIndex('store'));
            }
        },

        computed: {
            ...GlobalField.computed(),
            getCheck() {
                if (this.getIndex('get') && this.getOption('store.get', true)) {
                    this.checked = Boolean(this.model);
                }else {
                    this.checked = Boolean(this.value);
                }
                switch (this.checked) {
                    case 'true':
                        this.checked = true;
                        break;
                    case 'false':
                        this.checked = false;
                        break;
                }
                return this.checked;
            }
        },
        methods: {
            ...GlobalField.methods(),
            changeValue: function () {
                this.checked = !this.getCheck;
            },
        },
        watch: {
            ...GlobalField.watch(),
            checked: {
                handler: function (newValue) {
                    if (typeof(newValue) !== "undefined") {
                        this.model = newValue ? 1 : null
                    }
                }
            }
        }

    }
</script>

