import LoadIndexData from "../store/loadIndex.func";

const DataTableList = {
    computed: {
        ...LoadIndexData.computed(),
        getFilters() {
            return this.server ? this.iFilterAll : [
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
            if (typeof ($actions.edit) === "undefined" && this.edit)
                $actions =  {edit: $edit, ...$actions};

            return $actions;
        }
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
            query['filter'] = {
                type: $value || !this.baseFilter.type? this.filterData.type.value : this.baseFilter.type,
                operator: $value || !this.baseFilter.operator? this.filterData.operator.value : this.baseFilter.operator,
                value: $value || !this.baseFilter.value? $value : this.baseFilter.value,
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
                $this.setState('resource', $this.resource);
                $this.setState('url', $this.url);
                $this.setState('query', $this.query());
                $this.fetchData().then(resp => {
                    $this.$forceUpdate()
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
        },
        actionCheck(item, action, index) {
            if (!item.actions) return true;
            return iPath.get(item.actions, index, true);
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
        }
    },
};

export default DataTableList;
