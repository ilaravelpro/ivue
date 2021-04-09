/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 2/1/21, 2:47 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

import LoadIndexData from "../store/loadIndex.func";

const DataTableList = {
    computed: {
        ...LoadIndexData.computed(),
        getFilters() {
            return this.server ? Array.from(this.iFilterAll).filter(function ($filter) {
                return $filter.type !== 'hidden';
            }) : [
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
            let items = this.server ? this.iRecords : this.items;
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
            var $delete = {
                title: 'Delete',
                name: 'delete',
                icon: 'fa fa-trash-alt',
                type: 'func',
                action: this.deleteItem
            };
            var $edit =  {
                title: 'Edit',
                name: 'edit',
                icon: 'fa fa-edit',
                type: 'linkWithId',
                action: this.resource + '.edit'
            };
            let $actions = typeof (this.actions) === "function" ? this.actions(this, $edit, $delete) : typeof (this.actions) === "object" ? this.actions : {};
            if (typeof ($actions.delete) === "undefined" && this.delete)
                $actions =  {delete: $delete, ...$actions};
            if (typeof ($actions.update) === "undefined" && this.edit)
                $actions =  {update: $edit, ...$actions};

            return $actions;
        },
        filterStatusOther: function () {
            return
        },
        getBaseFilter: function () {
            return this.baseFilter instanceof Function ? this.baseFilter(this) : this.baseFilter;
        },
    },
    methods: {
        ...LoadIndexData.methods(),
        query() {
            var query = {
                page: this.pagination.current,
                per_page: this.pagination.length
            };
            query['order'] = this.sortKey;
            query['sort'] = this.sortOrders[this.sortKey] > 0 ? 'asc' : 'desc';
            var $value = (this.filterData.type.type === 'select' ? this.filterData.value.value : this.filterData.value);
            var $filters = [];
            if (this.getBaseFilter)
                $filters.push(...this.getBaseFilter);
            if ($value) {
                $filters.push({
                    type: this.filterData.type.value,
                    operator: this.filterData.operator.value,
                    value: $value,
                });
            }
            query['filters'] = $filters;
            query['status'] = this.filterStatus || 'active';
            if (this.baseQuery)
                query = {...query, ...(this.baseQuery instanceof Function ? this.baseQuery(this) : this.baseQuery)};
            return query;
        },
        renderStyle() {
            var style = '@media screen and (max-width: 992px) {';
            this.columns.forEach((column, index) => {
                style += `
                    .data-table table tbody tr td:nth-child(${index + 1}):before {
                        content: "${column.label}"
                    }
                  `;
            });
            style += `
                    .data-table table tbody tr td:last-child:before {
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
                $this.setState('resource', $this.resource);
                $this.setState('url', $this.url);
                $this.setState('query', $this.query());
                $this.fetchData().then(resp => {
                    $this.$forceUpdate()
                    $this.filterStatus = iPath.get($this.iMeta, 'filters.current.status')
                });
            }, 500)
        },
        paginate(array, length, pageNumber) {
            this.pagination.total = this.server ? this.iMeta.total : array.length;
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
            this.setState('query', {});
            this.sortKey = 'created_at';
            this.columns.forEach((column) => {
                this.sortOrders[column.name] = -1;
            });
            this.filterStatus = 'active';
            this.pagination.current = 1;
            this.paginateServer()
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
                    action.action(item, this)
                    break
            }
        },
        actionCheck(item, action, index) {
            if (this.actionIf) return this.actionIf(item, action, index);
            if (!item.actions) return true;
            return iPath.get(item.actions, index, true);
        },
        changeStatus(status) {
            this.filterStatus = status;
            if (this.server) this.paginateServer();
        },
        previous:function () {
            this.pagination.current--;
            this.paginateServer();
        },
        next:function () {
            this.pagination.current++;
            this.paginateServer();
        }
    },
    watch: {
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
        },
        getBaseFilter: {
            handler: function (newValue, oldValue) {
                if (this.server && newValue !== oldValue) this.paginateServer();
            },
            deep: true
        }
    },
};

export default DataTableList;
