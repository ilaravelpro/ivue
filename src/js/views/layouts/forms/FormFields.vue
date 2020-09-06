<template>
    <div :class="style">
        <h5 v-if="title" class="mb-1 col-12 p-1">{{ title }}</h5>
        <template v-for="item in items">
            <component :is="item.component" v-bind="item.attrs" :storeNamespace="storeNamespace" />
        </template>
    </div>
</template>

<script>
    export default {
        name: "i-form-fields",
        props: {
            items: [Object, Array],
            title: String,
            css: String,
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            }
        },
        computed: {
            style() {
                return this.css || null;
            }
        }
    }
</script>
