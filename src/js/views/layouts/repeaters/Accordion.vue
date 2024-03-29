<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 1/5/21, 12:04 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div class="i-repeater-accordion">
        <h5 v-if="title" v-text="title"></h5>
        <div v-if="getErrorStatus(getIndex('error'))" :class="`alert alert-${getErrorStatus(getIndex('error')) === 'valid' ? 'success' : 'danger'}`" role="alert">{{ getError(getIndex('error') + '.text') }}</div>
        <div class="row mb-3" v-if="getOption('addBtn') !== false">
            <div class="col-lg-4">
                <a @click="addRow"
                   class="btn btn-sm font-weight-bolder btn-primary">
                    <i class="fa fa-plus"></i> {{ addTitle ? addTitle : 'Add Item'}}
                </a>
            </div>
        </div>
        <div class="accordion" :id="id">
            <div v-for="(row, index)  in (getOption('items') ? getOption('items') : getValue(getIndex('get')))" class="card overflow-unset" >
                <div class="card-header" :id="'heading_' + id + '_' +index">
                    <div class="card-title d-block collapsed" data-toggle="collapse" :data-target="'#collapse_' + id + '_' +index"
                         aria-expanded="false" :aria-controls="'collapse_' + id + '_' +index">
                        <span v-if="typeof(header) === 'function'" class="cursor-pointer" v-html="header(row, index, getContext)"></span>
                        <slot v-else-if="$scopedSlots['row.title']" name="row.title" v-bind:row="row" v-bind:index="index" v-bind:prefix="prefixTitle"></slot>
                        <span v-else class="cursor-pointer">{{ prefixTitle }} {{ getValue(getIndex('get')+'.'+index+'.'+itemName) && getValue(getIndex('get')+'.'+index+'.'+itemName) !== "undefined" ? getValue(getIndex('get')+'.'+index+'.'+itemName) : index+1 }}</span>
                        <a @click="removeRow(index)" v-if="getOption('delBtn') !== false"
                           class="btn btn-sm font-weight-bolder btn-danger float-right">
                            <i class="fa fa-trash"></i>
                            Delete
                        </a>
                    </div>
                </div>

                <div :id="'collapse_' + id + '_' +index" class="collapse" :aria-labelledby="'heading_' + id + '_' +index" :data-parent="`#${id}`">
                    <div class="card-body">
                        <div v-if="getErrorStatus(getIndex('error') + '.' . index)" :class="`alert alert-${getErrorStatus(getIndex('error') + '.' . index) === 'valid' ? 'success' : 'danger'}`" role="alert">{{ getError(getIndex('error') + '.' . index+ '.text') }}</div>
                        <template v-if="typeof(body) === 'function'" >
                            <template v-for="item in body(row, index, getContext)">
                                <component :is="item.component" v-bind="item.attrs" :storeNamespace="storeNamespace"/>
                            </template>
                        </template>
                        <slot v-else name="body" v-bind:row="row" v-bind:index="index"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadSingleData from "../../../handel/functions/store/loadSingle.func";
    import BaseRepeater from "../../../handel/functions/repeaters/base.func";

    export default {
        name: "i-repeater-accordion",
        props: {
            title: {
                type: String,
                default : ""
            },
            addTitle: {
                type: String,
                default : ""
            },
            prefixTitle: {
                type: String,
                default : ""
            },
            id: {
                type: String,
                default : ""
            },
            itemName: {
                type: String,
                default : "name"
            },
            value: [String, Number, Object, Array],
            desc: [String, Number, Object, Array],
            header: Function,
            body: Function,
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object],
            options: {
                type: [Object, Array, Function],
                default: () => []
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
            items: {
                type: Array,
                default: () => []
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

