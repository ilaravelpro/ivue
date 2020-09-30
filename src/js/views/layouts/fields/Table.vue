<template>
    <div class="i-table  mb-2 overflow-x-auto">
        <h5 v-if="title" class="mb-1 col-12 p-1">{{ title }}</h5>
        <button class="btn btn-warning" @click="viewTable = !viewTable">Load Table</button>
        <template v-if="viewTable">
            <component v-if="getSlots('columns')" :is="getSlots('columns')"
                       :store-namespace="storeNamespace"></component>
            <div v-else-if="columns" class="d-flex">
                <div class="col-1"></div>
                <div v-if="getOption('fields.prepend')" class="px-0" v-for="item in getOption('fields.prepend')"
                     :class="item.style" v-text="item.title"></div>
                <div class="px-0" :class="getStyle('column')" v-for="column in getColumns">{{ column ? column + ' '+
                    String(getOption('unit.column')).toUpperCase() : '' }}
                </div>
                <div v-if="getOption('fields.append')" class="px-0" v-for="item in getOption('fields.append')"
                     :class="item.style" v-text="item.title"></div>
            </div>
            <div class="d-flex" v-for="(row, index) in getRows">
                <div class="col-12 col-md-1 my-auto">{{ row }} {{ getOption('unit.row') ? getOption('unit.row') :
                    String(getOption('prefix.row')).toUpperCase() }}
                </div>
                <div v-if="getOption('fields.prepend')" v-for="item in getOption('fields.prepend')" class="p-0 pr-4"
                     :class="item.style">
                    <component :is="item.component" v-bind="item.attrs"
                               :field-index="fieldIndex + '.' + getOption('prefix.row')+ index + '.' + item.name"
                               :store-namespace="storeNamespace"></component>
                </div>
                <div class="pr-4 mb-2" :class="getStyle('column')" v-for="(column, key) in getColumns">
                    <div v-if="getOption('fields.columns')" class="form-group row mb-0">
                        <div v-for="item in getOption('fields.columns')" :class="getStyle('item')">
                            <component :is="item.component" v-bind="item.attrs"
                                       :field-index="fieldIndex + '.'  + getOption('prefix.row')+ index + '.' + item.name + '.' + getOption('prefix.column')+ key"
                                       :store-namespace="storeNamespace"></component>
                            <div class="d-md-none mb-3"></div>
                        </div>
                    </div>
                </div>
                <div v-if="getOption('fields.append')" v-for="item in getOption('fields.append')" class="p-0 pr-4"
                     :class="item.style">
                    <component :is="item.component" v-bind="item.attrs"
                               :field-index="fieldIndex + '.' + getOption('prefix.row') + index + '.' + item.name"
                               :store-namespace="storeNamespace"></component>
                </div>
            </div>
        </template>
    </div>
</template>


<script>
    import LoadSingleData from "../../../handel/functions/store/loadSingle.func";

    export default {
        name: 'i-table',
        props: {
            title: String,
            slots: Object,
            rows: [Object, Array, Function],
            columns: [Object, Array, Function],
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
        },
        data() {
            return {
                viewTable: false
            }
        },
        computed: {
            ...LoadSingleData.computed(),
            getColumns() {
                return typeof (this.columns) === 'function' ? this.columns(this.getValue, this.updateValue) : this.columns;
            },
            getRows() {
                return typeof (this.rows) === 'function' ? this.rows(this.getValue, this.updateValue) : this.rows;
            }
        },
        methods: {
            ...LoadSingleData.methods(),
        }
    }
</script>
