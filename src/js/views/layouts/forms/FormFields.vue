<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 1/23/21, 3:59 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div :class="style">
        <h5 v-if="title" class="mb-1 col-12 p-1" v-html="getTitle"></h5>
        <template v-for="item in getItems">
            <component :is="item.component" v-bind="item.attrs" v-if="item && typeof(item.if) === 'function'? item.if(getContext) : item" :storeNamespace="item.attrs.storeNamespace || storeNamespace" >
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
            title: [String, Function],
            css: String,
            externalSubmit: Function,
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            }
        },
        computed: {
            ...GlobalField.computed(),
            getTitle: function (){
                return typeof(this.title) == 'function' ? this.title(this) : this.title;
            },
            getItems() {
                var $this = this;
                var $items = typeof(this.items) == 'function' ? this.items(this) : this.items;
                $items = Array.from($items).map(function (v) {
                    if(v && v.useESubmit)
                        v.attrs.externalSubmit = $this.externalSubmit
                    return v;
                })
                return $items
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
