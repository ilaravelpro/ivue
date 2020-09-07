<template>
    <div class="i-repeater-accordion">
        <h5 v-if="title" v-text="title"></h5>
        <div v-if="getErrorStatus(getIndex('error'))" :class="`alert alert-${getErrorStatus(getIndex('error')) === 'valid' ? 'success' : 'danger'}`" role="alert">{{ getError(getIndex('error') + '.text') }}</div>
        <div class="accordion" :id="id">
            <div v-for="(row, index) in getValue(getIndex('get'))" class="card" >
                <div class="card-header" id="headingOne" :id="'heading_' + id + '_' +index">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Collapsible Group Item #1
                        </button>
                    </h5>
                    <div class="card-title collapsed d-block" data-toggle="collapse" :data-target="'#collapse_' + id + '_' +index"
                         aria-expanded="false" :aria-controls="'collapse_' + id + '_' +index">
                        <div v-if="header" v-html="header(row, index, prefixTitle)"></div>
                        <slot v-else-if="$scopedSlots['row.title']" name="row.title" v-bind:row="row" v-bind:index="index" v-bind:prefix="prefixTitle"></slot>
                        <span v-else>{{ prefixTitle }} {{ getValue(getIndex('get')+'.'+index+'.'+itemName) && getValue(getIndex('get')+'.'+index+'.'+itemName) !== "undefined" ? getValue(getIndex('get')+'.'+index+'.'+itemName) : index+1 }}</span>
                        <a @click="removeRow(index)"
                           class="btn btn-sm font-weight-bolder btn-danger float-right">
                            <i class="fa fa-trash"></i>
                            Delete
                        </a>
                    </div>
                </div>

                <div :id="'collapse_' + id + '_' +index" class="collapse show" :aria-labelledby="'heading_' + id + '_' +index" :data-parent="`#${id}`">
                    <div class="card-body">
                        <div v-if="getErrorStatus(getIndex('error') + '.' . index)" :class="`alert alert-${getErrorStatus(getIndex('error') + '.' . index) === 'valid' ? 'success' : 'danger'}`" role="alert">{{ getError(getIndex('error') + '.' . index+ '.text') }}</div>
                        <template v-if="body" v-for="item in body(row, index, prefixTitle)">
                            <component :is="item.component" v-bind="item.attrs" :storeNamespace="storeNamespace"/>
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
        },
        data() {
            return {
                model: null,
            }
        },
        computed: {
            ...GlobalField.computed(storeNamespace),
            styleForTextArea() {
                return this.styleForField + (this.resize ? 'resize-none' : '');
            }
        },
        methods: {
            ...GlobalField.methods(storeNamespace)
        },
        watch: {
            ...GlobalField.watch(storeNamespace),
        }
    }
</script>

