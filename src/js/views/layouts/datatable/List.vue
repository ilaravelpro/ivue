<template>
    <div class="data-table" :id="id">
        <div v-if="filter" class="row px-3 mt-3 mx-0">
            <div class="col-lg-6 col-xl-5 col-12">
                <div class="row">
                    <div class="col-md-6 align-self-center">
                        <i-base-select :items="getFilters" type="array"
                                    v-model="filterData.type"/>
                    </div>
                    <div class="col-md-6 align-self-center">
                        <i-base-select  v-if="filterData.type && filterData.type.type === 'select'" type="array"
                                    :items="filterData.type.items"
                                    v-model="filterData.value"/>
                        <i-input  v-if="filterData.type && filterData.type.type === 'text'" v-model="filterData.value"  placeholder="Search..." :options="{icon: {append: {class: 'fa fa-search'}}}" />
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-5 col-12 align-self-center">
                <button v-if="server" class="btn btn-primary px-6 font-weight-bold" @click="paginateServer()">Search</button>
                <button href="#" class="btn btn-warning px-6 font-weight-bold" @click="resetQuery()">Reset</button>
            </div>
        </div>

        <div class="container-table">
            <div class="wrap-table">
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
                    <tr v-for="item in paginatedItems" :key="item.id">
                        <td v-for="column in columns">
                            <slot v-if="$scopedSlots['item.'+column.name]" :name="'item.'+column.name" v-bind:column="column" v-bind:item="item"></slot>
                            <template v-else>
                                {{item[column.name]}}
                            </template>
                        </td>
                        <td v-if="action">
                            <button v-for="(action, index) in getActions" @click="actionItem(item, action)"
                                    class="btn btn-icon btn-light btn-sm" :class="index !== Object.keys(getActions)[Object.keys(getActions).length - 1] ? 'mr-1' : ''" :title="action.title">
                                <span :class="action.icon"></span>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-100 d-md-flex mt-2">
                <div class="col-md-9 col-12 d-md-flex px-0">
                    <div class="col-md-2 px-0 my-2 mr-md-2">
                        <select v-model="pagination.length" class="form-control cursor-pointer" id="rawsPerPage" @change="resetPagination()"
                                data-toggle="tooltip" data-placement="top" title="Rows per page">
                            <option v-for="itemPerPage in itemsPerPage" :value="itemPerPage">{{ itemPerPage }}</option>
                        </select>
                    </div>
                    <i-datatable-pagination class="my-2" :current="meta.current_page" :pages="meta.last_page"
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
    import {mapGetters, mapActions} from 'vuex'
    import IDatatablePagination from "./Pagination";

    export default {
        name: "i-datatable-list",
        components: {IDatatablePagination},
        props: {
            id: String,
            resource: String,
            url: String,
            columns: [Object, Array],
            options: Object,
            items: [Array, Object],
            storeNamespace: {
                type: String,
                default: 'GlobalIndex'
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
            actions: Object,
            newAction: Object,
        },
        data() {
            return {
                filterData: {
                    type: {},
                    operator: {},
                    value: '',
                },
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
            ...mapGetters('DataIndex', ['data', 'total', 'meta', 'loading', 'filters', 'operators']),
            getFilters() {
                return this.server ? this.filters : [
                    {
                        name: "all",
                        title: "all",
                        type: "text",
                    }
                ];
            },
            itemsPerPage(){
                return iPath.get(this.options, 'itemsPerPage', [10,20,40,100]);
            },
            filteredItems() {
                let items = this.server ? this.data : this.items;
                if (!this.server && this.filterData) {
                    items = items.filter((row) => {
                        if (this.filterData.type.name === 'all')
                            return Object.keys(row).some((key) => {
                                return String(row[key]).toLowerCase().indexOf(this.filterData.value.toLowerCase()) > -1;
                            })
                        else
                            return String(row[this.filterData.type.name]).toLowerCase().indexOf(this.filterData.value.toLowerCase()) > -1;

                    });
                }
                let sortKey = this.sortKey;
                if (!this.server && sortKey) {
                    let order = this.sortOrders[sortKey] || 1;
                    items = items.slice().sort((a, b) => {
                        let index = this.getIndex(this.columns, 'name', sortKey);
                        a = String(a[sortKey]).toLowerCase();
                        b = String(b[sortKey]).toLowerCase();
                        if (this.columns[index].type && this.columns[index].type === 'date') {
                            return (a === b ? 0 : new Date(a).getTime() > new Date(b).getTime() ? 1 : -1) * order;
                        } else if (this.columns[index].type && this.columns[index].type === 'number') {
                            return (+a === +b ? 0 : +a > +b ? 1 : -1) * order;
                        } else {
                            return (a === b ? 0 : a > b ? 1 : -1) * order;
                        }
                    });
                }
                return items;
            },
            paginatedItems() {
                return this.paginate(this.filteredItems, this.pagination.length, this.pagination.current);
            },
            getActions() {
                let $actions = typeof (this.actions) === "object" ? this.actions : {};
                if (typeof ($actions.delete) === "undefined") {
                    $actions =  {delete: {
                            title: 'Delete',
                            name: 'delete',
                            icon: 'fa fa-trash-alt',
                            type: 'func',
                            action: this.deleteItem
                        }, ...$actions};
                }
                if (typeof ($actions.edit) === "undefined") {
                    $actions =  {edit: {
                            title: 'Edit',
                            name: 'edit',
                            icon: 'fa fa-edit',
                            type: 'linkWithId',
                            action: this.resource + '.edit'
                        }, ...$actions};
                }
                return $actions;
            }
        },
        created() {
            var  $this = this;
            this.setState(['resource', this.resource]);
            if (this.server) this.paginateServer();
            this.columns.forEach((column) => {
                $this.sortOrders[column.name] = -1;
            });
        },
        mounted() {
            this.renderStyle();
        },
        watch: {
            columns: {
                handler: function () {
                    /*var  $this = this;
                    this.columns.forEach((column) => {
                        $this.sortOrders[column.name] = -1;
                    });*/
                },
                deep: true
            },
            pagination: {
                handler: function () {
                    if (this.server) this.paginateServer();
                },
                deep: true
            },
            sortOrders: {
                handler: function (newValue) {
                    if (this.server) this.paginateServer();
                },
                deep: true
            }
        },
        methods: {
            ...mapActions('DataIndex', ['fetchData', 'destroyData', 'setState']),
            deleteItem(item) {
                if (confirm('Are you sure you want to delete this Item?'))
                    this.destroyData(item.id)
            },
            query() {
                var query = {
                    page: this.pagination.current,
                    per_page: this.pagination.length
                };
                query['order'] = this.sortKey;
                query['sort'] = this.sortOrders[this.sortKey] > 0 ? 'asc' : 'desc';
                query['filter'] = {
                    type: this.filterData.type.value,
                    operator: this.filterData.operator.value,
                    value: (this.filterData.type.type === 'select' ? this.filterData.value.value : this.filterData.value),
                };
                return query;
            },
            renderStyle() {
                var style = '@media screen and (max-width: 992px) {';
                this.columns.forEach((column, index) => {
                    style += `
                    table tbody tr td:nth-child(${index + 1}):before {
                        content: "${column.label}"
                    }
                  `;
                });
                style += `
                    table tbody tr td:last-child:before {
                        content: "Action"
                    }`
                style += '}'
                if (!style) return;
                this.styleTag = document.createElement('style');
                this.styleTag.appendChild(document.createTextNode(style));
                document.head.appendChild(this.styleTag);
            },
            paginateServer() {
                iProcessing.init(this.resource + '.paginate_server', this, ($this) => {
                    $this.setState(['resource', $this.resource]);
                    $this.setState(['url', $this.url]);
                    $this.setState(['query', $this.query()]);
                    $this.fetchData().then(resp => {
                        $this.$forceUpdate()
                    });
                }, 500)
            },
            paginate(array, length, pageNumber) {
                this.pagination.total = this.server ? this.meta.total : array.length;
                this.pagination.from = this.pagination.total ? ((pageNumber - 1) * length) + 1 : ' ';
                this.pagination.to = pageNumber * length > this.pagination.total ? this.pagination.total : pageNumber * length;
                return this.server ? array : array.slice((pageNumber - 1) * length, pageNumber * length);
            },
            sortBy(key) {
                this.resetPagination();
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1;
                if (this.server) this.paginateServer();
            },
            getIndex(array, key, value) {
                return array.findIndex(i => i[key] === value)
            },
            resetQuery() {
                this.filterData = {
                    type: {},
                    operator: {},
                    value: '',
                };
                this.setState(['query', {}]);
                this.sortKey = 'created_at';
                this.columns.forEach((column) => {
                    this.sortOrders[column.name] = -1;
                });
                this.pagination.current = 1;
            },
            resetPagination() {
                this.pagination.current = 1;
            },
            actionItem(item, action) {
                switch (action.type) {
                    case 'linkWithId':
                        this.$router.push({name: action.action, params: {id: item.id}});
                        break;
                    case 'route':
                        this.$router.push(action.action);
                        break;
                    case 'func':
                        action.action(item)
                        break
                }
            }
        },
    }
</script>

<style scoped>

</style>
