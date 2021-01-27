<template>
    <div ref="select" class="i-select" :class="styleForField">
        <div class="select-title cursor-pointer text-no-wrap w-90" @click="onShow">
            {{ getSelects }}
        </div>
        <ul class="select-items p-0" ref="items">
            <li v-if="search" class="select-search px-3">
                <input ref="search" type="text" placeholder="Search..." class="form-control" @keyup="filtering($event)" v-model="searchText">
            </li>
            <li v-if="actions" class="select-actions px-3">
                <div class="btn-group btn-group-sm btn-block">
                    <button v-if="multiple" @click="selectAll" type="button" class="actions-btn bs-select-all btn btn-light">Select All</button>
                    <button type="button" @click="deSelect" class="actions-btn bs-deselect-all btn btn-light">Deselect{{ multiple ? ' All' : ''}}</button>
                </div>
            </li>
            <li class="select-item" v-for="(item, index) in itemsByFiltered" :data-key="index" :data-value="item.value"
                @click="onSelect(item, index, $event)" v-html="viewItem(item, index, itemsByFiltered)">
            </li>
        </ul>
    </div>
</template>


<script>
    import GlobalField from "../../../../handel/functions/field/global.func";
    import SelectField from "../../../../handel/functions/field/select.func";
    import LoadSingleData from "../../../../handel/functions/store/loadSingle.func";
    export default {
        name: 'i-base-select',
        model: {
            event: 'change'
        },
        props: {
            label: String,
            value: [String, Number, Object, Array],
            placeholder: {
                type: String,
                default: 'Please Select...'
            },
            desc: [String, Number, Object, Array],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object, Function],
            search: Boolean,
            multiple: Boolean,
            actions: Boolean,
            diff: [String, Number, Object, Array],
            release: [Function, Object],
            view: Function,
            icon: Object,
            url: [String, Function],
            type: {
                type: String,
                default: 'single'
            },
            items: {
                type: [Object, Array, Function],
                default: () => []
            },
            firstItems: {
                type: [Object, Array],
                default: () => []
            },
            firstSelect: Boolean,
            options: {
                type: [Object, Array, Function],
                default: () => []
            },
            query: {
                type: [Object, Array, Function],
                default: () =>  {}
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
        },
        data() {
            return {
                model: null,
                searchText: '',
                selected: null,
                loading: false,
                height: 0,
                serverItems: [],
                serverQuery: {
                    page: 0,
                    pages: 1,
                },
                useModel: false,
                useFirst: false,
                modelAll: null
            }
        },
        mounted() {
            var $this = this;
            window.onclick = function(event) {
                if (event.target.matches && !event.target.matches('.select-title, .select-item, .select-search input, .select-actions div button'))
                    $('.select-items').removeClass('d-block')
            }
            $(document).ready(function(){
                if ($this.url)
                    $($this.$refs.items).scroll(function() {
                        var $el = $(this);
                        if (!$this.loading && $el.scrollTop() + $($this.$refs.select).outerHeight(true) > $el.children().length  * $($el.children()[0]).height()){
                            $this.moreLoad();
                        }

                    });
            });
            this.checkItems();
        },
        created() {
            LoadSingleData.setValueOnCreate(this)
            if (this.url)this.moreLoad()
        },
        computed: {
            ...GlobalField.computed(),
            ...SelectField.computed,
        },
        methods: {
            ...GlobalField.methods(),
            ...SelectField.methods,
        },
        watch: {
            ...GlobalField.watch(),
            ...SelectField.watch
        }
    }

</script>
