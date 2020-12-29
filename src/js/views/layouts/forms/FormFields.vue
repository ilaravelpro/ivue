<template>
    <div :class="style">
        <h5 v-if="title" class="mb-1 col-12 p-1">{{ title }}</h5>
        <template v-for="item in getItems">
            <component :is="item.component" v-bind="item.attrs" v-if="item.if ? item.if(getContext) : true" :storeNamespace="storeNamespace" >
                <template v-if="item.text">{{ item.text }}</template>
            </component>
        </template>
    </div>
</template>

<script>
    import GlobalField from "../../../handel/functions/field/global.func";

    export default {
        name: "i-form-fields",
        props: {
            items: [Object, Array, Function],
            title: String,
            css: String,
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            }
        },
        computed: {
            ...GlobalField.computed(),
            getItems() {
                return typeof(this.items) == 'function' ? this.items(this) : this.items;
            },
            style() {
                return this.css || null;
            }
        },
        methods: {
            ...GlobalField.methods()
        },
    }
</script>
