<template>
    <div class="data-table" :id="id">
        <!--<div style="margin-bottom: 20px;">
            <h2>Laravel and VueJS Datatable from Scratch</h2>
        </div>
        <div class="table-style">
            <input class="input" type="text" v-model="search" placeholder="Search..."
                   @input="resetPagination()" style="width: 250px;">
            <div class="control">
                <div class="select">
                    <select v-model="length" @change="resetPagination()">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>
        </div>-->

        <div class="container-table">
            <div class="wrap-table">
                <div class="">
                    <table>
                        <thead>
                        <tr class="table-head">
                            <th v-for="column in columns" :key="column.name" @click="sortBy(column.name)"
                                :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'sorting_asc' : 'sorting_desc') : 'sorting'"
                                :style="`width: ${100 / (columns.length + 2)}%; cursor:pointer;`">
                                {{column.label}}
                            </th>
                            <th :style="`width: ${100 / (columns.length + 2)}%; cursor:pointer;`">Action2</th>
                            <th :style="`width: ${100 / (columns.length + 2)}%; cursor:pointer;`">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="user in paginatedUsers" :key="user.id">
                            <td v-for="column in columns">
                                {{user[column.name]}}
                            </td>
                            <td><input type="text"></td>
                            <td><a class="btn btn-danger btn-sm" href="#" @click="deleteItem(user)">Remove</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <div>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
                <nav class="pagination">
                <span class="page-stats">
                    {{pagination.from}} - {{pagination.to}} of {{filteredUsers.length}}
                    <span v-if="`filteredUsers.length < pagination.total`"></span>
                </span>
                    <a v-if="pagination.prevPage" class="btn btn-sm btn-primary pagination-previous"
                       @click="--pagination.currentPage">
                        Prev
                    </a>
                    <a class="btn btn-sm pagination-previous btn-primary" v-else disabled>
                        Prev
                    </a>
                    <a v-if="pagination.nextPage" class="btn btn-sm btn-primary pagination-next"
                       @click="++pagination.currentPage">
                        Next
                    </a>
                    <a class="btn btn-sm pagination-next btn-primary" v-else disabled>
                        Next
                    </a>
                </nav>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "i-datatable-list",
        props: {
            server: Boolean,
            options: Object
        },
        created() {
            this.setState(['resource', 'points']);
            if (this.server) this.fetchData();
        },
        mounted() {
            this.renderStyle();
        },
        data() {
            let sortOrders = {};
            let columns = [
                {label: 'Name', name: 'name'},
                {label: 'Country', name: 'country'},
                {label: 'Longitude', name: 'longitude'},
                {label: 'Latitude', name: 'latitude'},
                {label: 'Status', name: 'status'},
                {label: 'Date Added', name: 'created_at'},
            ];
            columns.forEach((column) => {
                sortOrders[column.name] = -1;
            });

            return {
                styleTag: [],
                id: 'routeTable',
                users: [],
                columns: columns,
                sortKey: 'created_at',
                sortPos: 'asc',
                sortOrders: sortOrders,
                length: 10,
                search: '',
                pagination: {
                    currentPage: 1,
                    total: '',
                    nextPage: '',
                    prevPage: '',
                    from: '',
                    to: ''
                },
            }
        },
        methods: {
            ...mapActions('DataIndex', ['fetchData', 'destroyData', 'setState']),
            deleteItem(item) {
                if (confirm('Are you sure you want to delete this Item?'))
                    this.destroyData(item.id)
            },
            renderStyle() {
                const css = this.style;
                if (!css) return;
                this.styleTag = document.createElement('style');
                this.styleTag.appendChild(document.createTextNode(css));
                document.head.appendChild(this.styleTag);
            },
            paginate(array, length, pageNumber) {
                this.pagination.from = array.length ? ((pageNumber - 1) * length) + 1 : ' ';
                this.pagination.to = pageNumber * length > array.length ? array.length : pageNumber * length;
                this.pagination.prevPage = pageNumber > 1 ? pageNumber : '';
                this.pagination.nextPage = array.length > this.pagination.to ? pageNumber + 1 : '';
                return array.slice((pageNumber - 1) * length, pageNumber * length);
            },
            resetPagination() {
                this.pagination.currentPage = 1;
                this.pagination.prevPage = '';
                this.pagination.nextPage = '';
            },
            sortBy(key) {
                this.resetPagination();
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1;
            },
            getIndex(array, key, value) {
                return array.findIndex(i => i[key] == value)
            },
        },
        computed: {
            ...mapGetters('DataIndex', ['data', 'total', 'loading']),
            style() {
                var style = '@media screen and (max-width: 992px) {';
                this.columns.forEach((column, index) => {
                    style += `
                    table tbody tr td:nth-child(${index + 1}):before {
                        content: "${column.label}"
                    }
                  `;
                });
                style += '}'
                return style;
            },
            filteredUsers() {
                let users = this.data;
                if (this.search) {
                    users = users.filter((row) => {
                        return Object.keys(row).some((key) => {
                            return String(row[key]).toLowerCase().indexOf(this.search.toLowerCase()) > -1;
                        })
                    });
                }
                let sortKey = this.sortKey;
                let order = this.sortOrders[sortKey] || 1;
                if (sortKey) {
                    users = users.slice().sort((a, b) => {
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
                return users;
            },
            paginatedUsers() {
                return this.paginate(this.filteredUsers, this.length, this.pagination.currentPage);
            }
        }
    }
</script>

<style scoped>

</style>
