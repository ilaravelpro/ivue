<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 1/5/21, 11:58 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div class="i-repeater">
        <i-base
            :label="title"
            :store-namespace="storeNamespace"
            :field-index="fieldIndex"
            :options="options"
            :css="css"
            :slots="slots"
        >
            <slot slot="label-append" name="label-append"/>
            <slot slot="label-prepend" name="label-prepend"/>
            <slot slot="prepend" name="prepend"/>
            <slot slot="append" name="append"/>
            <template slot="input-group">
                <div v-if="type !== 'single' && model && model.length > 0" class="d-flex flex-wrap my-2 hidden-mobile">
                    <template v-if="typeof(body) === 'function'">
                        <template v-for="comp in body({}, -1, getContext)">
                            <div v-if="comp.component === 'i-form-fields'" :class="comp.attrs.class">
                                <div v-for="child in comp.attrs.items" :class="child.attrs.class" class="px-0">{{ child.attrs.placeholder }}</div>
                            </div>
                            <div v-else :class="comp.attrs.class" class="px-0">{{ comp.attrs.placeholder }}</div>
                        </template>
                    </template>
                </div>
                <template v-for="(item, index) in model">
                    <div class="d-flex flex-wrap my-2">
                        <template v-if="typeof(body) === 'function'">
                            <template v-for="comp in body(item, index, getContext)">
                                <component :is="comp.component" v-bind="comp.attrs" :storeNamespace="storeNamespace"/>
                            </template>
                        </template>
                        <slot v-else name="body" v-bind:item="item" v-bind:index="index"></slot>
                        <div :class="removeClass">
                            <a @click="removeRow(index)"
                               class="btn btn-sm font-weight-bolder btn-danger">
                                <i class="fa fa-trash"></i>
                                Delete
                            </a>
                        </div>
                    </div>
                </template>
            </template>
        </i-base>
        <div class="d-flex flex-wrap mt-2">
            <label v-if="title" :class="styleForLabel"></label>
            <div class="col-lg-4">
                <a @click="addRow"
                   class="btn btn-sm font-weight-bolder btn-primary">
                    <i class="fa fa-plus"></i> Add
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadSingleData from "../../../handel/functions/store/loadSingle.func";
    import BaseRepeater from "../../../handel/functions/repeaters/base.func";
    import BaseField from "../../../handel/functions/field/base.func";

    export default {
        name: "i-repeater-base",
        props: {
            title: {
                type: String,
                default: ""
            },
            addTitle: {
                type: String,
                default: ""
            },
            prefixTitle: {
                type: String,
                default: ""
            },
            id: {
                type: String,
                default: ""
            },
            itemName: {
                type: String,
                default: "name"
            },
            value: [String, Number, Object, Array],
            desc: [String, Number, Object, Array],
            slots: Object,
            header: Function,
            body: Function,
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
            removeClass: {
                type: [String, Object],
                default: 'col-4 my-auto'
            },
            type: {
                type: String,
                default: 'multi'
            },
        },
        data() {
            return {
                model: null,
            }
        },
        created() {
            LoadSingleData.setValueOnCreate(this)
        },
        computed: {
            ...LoadSingleData.computed(),
            ...BaseField.computed,
        },
        methods: {
            ...LoadSingleData.methods(),
            ...BaseRepeater.methods
        },
        watch: {
            ...LoadSingleData.watch(),
        }
    }
</script>

