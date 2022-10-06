<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 1/29/21, 6:09 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div class="data-table" :id="id">
        <div v-if="filter" class="row mx-0" :class="{'px-lg-3': !child}">
            <div class="col-lg-6 col-xl-5 col-12 px-0">
                <div class="d-flex flex-wrap">
                    <div class="col-md-6 my-2 align-self-center" :class="{'p-0': child}">
                        <div class="input-group">
                            <i-base-select :items="getFilters" firstSelect type="array"
                                           v-model="filterData.type"/>
                        </div>
                    </div>
                    <div class="col-md-6 my-2 align-self-center" :class="{'p-0 px-lg-3': child}">
                        <div class="input-group">
                            <i-base-select  v-if="filterData.type && filterData.type.type === 'select'" :multiple="filterData.type.multiple" type="array"
                                            :items="filterData.type.items"
                                            v-model="filterData.value"/>
                        </div>
                        <i-input  v-if="filterData.type && filterData.type.type === 'text'" v-model="filterData.value"  placeholder="Search..." :options="{icon: {append: {class: 'fa fa-search'}}}" />
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-5 col-12 my-2 align-self-center" :class="{'p-0': child}">
                <button v-if="server" class="btn btn-primary px-6 font-weight-bold" @click="paginateServer()">Search</button>
                <button href="#" class="btn btn-warning px-6 font-weight-bold" @click="resetQuery()">Reset</button>
            </div>
        </div>

        <div v-if="status && iStatuses && iStatuses instanceof Array && iStatuses.length > 1" class="d-flex flex-wrap mt-2" :class="{'mx-0 p-0 mb-2': child, 'mx-2 mx-lg-4' : !child }">
            <button v-for="(status, index) in iStatuses" class="btn px-6 font-weight-bold" :class="{'mx-2' : (!child ? true : index),'bg-green color-white':filterStatus === status.value, 'bg-white color-primary': !child && filterStatus !== status.value, 'bg-primary color-white': child && filterStatus !== status.value }" @click="changeStatus(status.value)">{{ status.text.charAt(0).toUpperCase() + status.text.slice(1) }}</button>
        </div>

        <div class="container-table" :class="{'p-0': child}">
            <div class="wrap-table position-relative">
                <loading :status="!iLoading"/>
                <table>
                    <thead>
                    <tr class="table-head">
                        <th v-for="column in columns" :key="column.name" @click="sortBy(column.name)"
                            :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'sorting_asc' : 'sorting_desc') : 'sorting'"
                            :style="`width: ${100 / (columns.length + 2)}%; cursor:pointer;`">
                            {{column.label}}
                        </th>
                        <th v-if="action" :style="`width: ${100 / (columns.length + 2)}%; cursor:pointer;`">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in paginatedItems" :key="item.id" :class="item.status ? `status-${resource} status-${item.status}` : ''">
                        <td v-for="column in columns">
                            <slot v-if="$scopedSlots['item.'+column.name]" :name="'item.'+column.name" v-bind:column="column" v-bind:item="item"></slot>
                            <template v-else>
                                {{iPath.get(item, column.name)}}
                            </template>
                        </td>
                        <td v-if="action">
                            <button v-for="(action, index) in getActions" v-if="actionCheck(item, action, index)" @click="actionItem(item, action)"
                                    class="btn btn-icon btn-light btn-sm" :class="index !== Object.keys(getActions)[Object.keys(getActions).length - 1] ? 'mr-1' : ''" :title="action.title">
                                <span :class="action.icon"></span>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-100 d-md-flex mt-2" v-if="pagination_status">
                <div class="col-md-9 col-12 d-md-flex px-0">
                    <div class="col-md-2 px-0 my-2 mr-md-2">
                        <select v-model="pagination.length" class="form-control cursor-pointer" id="rawsPerPage" @change="resetPagination()"
                                data-toggle="tooltip" data-placement="top" title="Rows per page">
                            <option v-for="itemPerPage in itemsPerPage" :value="itemPerPage">{{ itemPerPage }}</option>
                        </select>
                    </div>
                    <i-datatable-pagination class="my-2" :current="iMeta.current_page" :pages="iMeta.last_page"
                                            v-on:update:current="pagination.current = $event"/>
                </div>
                <div class="col-md-3 col-12 p-0">
                    <div class="page-stats text-md-right text-center">
                        {{pagination.from}} - {{pagination.to}} of {{pagination.total}}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import IDatatablePagination from "./Pagination";
    import DataTableList from "../../../handel/functions/datatable/list.func";

    export default {
        name: "i-datatable-list",
        components: {IDatatablePagination},
        props: {
            id: String,
            resource: String,
            url: String,
            status_url: String,
            columns: [Object, Array],
            options: Object,
            items: [Array, Object],
            storeNamespace: {
                type: String,
                default: 'DataIndex'
            },
            edit: {
                type: Boolean,
                default: true
            },
            delete: {
                type: Boolean,
                default: true
            },
            action: {
                type: Boolean,
                default: true
            },
            filter: {
                type: Boolean,
                default: true
            },
            server: {
                type: Boolean,
                default: true
            },
            status: {
                type: Boolean,
                default: true
            },
            pagination_status: {
                type: Boolean,
                default: true
            },
            actions: [Object, Function],
            baseFilter: [Array, Object, Function],
            baseQuery: [Array, Object, Function],
            newAction: Object,
            child: Boolean,
            actionIf: Function,
        },
        data() {
            return {
                iPath: window.iPath,
                filterData: {
                    type: {},
                    operator: {},
                    value: '',
                },
                filterStatus: 'active',
                styleTag: null,
                sortKey: 'id',
                sortOrders: {},
                pagination: {
                    current: 1,
                    length: 20,
                    total: 0,
                    from: 1,
                    to: 1
                },
            }
        },
        computed: {
            ...DataTableList.computed,
        },
        created() {
            var $this = this;
            this.setState('resource', this.resource);
            if (this.status) {
                this.fetchStatus()
            }
            if (this.server) this.paginateServer();
            this.$emit('methods.paginateServer', this.paginateServer)
            this.columns.forEach((column) => {
                $this.sortOrders[column.name] = -1;
            });
        },
        mounted() {
            this.renderStyle();
        },
        watch: {
            ...DataTableList.watch
        },
        methods: {
            ...DataTableList.methods,
        },
    }
</script>

<style scoped>

</style>
