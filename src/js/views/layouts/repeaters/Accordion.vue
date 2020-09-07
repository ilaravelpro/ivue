<template>
    <div class="i-repeater-accordion">
        <h5 v-if="title" v-text="title"></h5>
        <div v-if="getErrorStatus(getIndex('error'))" :class="`alert alert-${getErrorStatus(getIndex('error')) === 'valid' ? 'success' : 'danger'}`" role="alert">{{ getError(getIndex('error') + '.text') }}</div>
        <div class="row mb-3">
            <div class="col-lg-4">
                <a @click="addRow"
                   class="btn btn-sm font-weight-bolder btn-primary">
                    <i class="la la-plus"></i> {{ addTitle ? addTitle : 'Add Item'}}
                </a>
            </div>
        </div>
        <div class="accordion" :id="id">
            <div v-for="(row, index) in getValue(getIndex('get'))" class="card" >
                <div class="card-header" :id="'heading_' + id + '_' +index">
                    <div class="card-title d-block collapsed" data-toggle="collapse" :data-target="'#collapse_' + id + '_' +index"
                         aria-expanded="false" :aria-controls="'collapse_' + id + '_' +index">
                        <div v-if="typeof(header) === 'function'" v-html="header(row, index, prefixTitle)"></div>
                        <slot v-else-if="$scopedSlots['row.title']" name="row.title" v-bind:row="row" v-bind:index="index" v-bind:prefix="prefixTitle"></slot>
                        <span v-else class="cursor-pointer">{{ prefixTitle }} {{ getValue(getIndex('get')+'.'+index+'.'+itemName) && getValue(getIndex('get')+'.'+index+'.'+itemName) !== "undefined" ? getValue(getIndex('get')+'.'+index+'.'+itemName) : index+1 }}</span>
                        <a @click="removeRow(index)"
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
                            <template v-for="item in body(row, index)">
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
    import GlobalField from "../../../handel/functions/field/global.func";

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
                type: [Object, Array],
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
        computed: {
            ...GlobalField.computed(),
            styleForTextArea() {
                return this.styleForField + (this.resize ? 'resize-none' : '');
            }
        },
        methods: {
            ...GlobalField.methods(),
            addRow: function() {
                var add = {};
                $.each(this.items, function (i, v) {
                    add[i] = v;
                });
                if (this.getValue(this.getIndex('get'))){
                    this.updateValue(this.getIndex('update') + '.' + Number(Object.keys(this.getValue(this.getIndex('get'))).length), add)
                }
                else {
                    this.updateValue(this.getIndex('update') , [add])
                }
                this.$forceUpdate()
            },
            removeRow: function(index) {
                if (confirm('Are you sure you want to delete this element?')) {
                    this.delValue(this.getIndex('get') + '.' + index)
                    this.$forceUpdate()
                }
            },
        },
        watch: {
            ...GlobalField.watch(),
        }
    }
</script>

