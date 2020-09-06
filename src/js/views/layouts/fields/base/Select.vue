<template>
    <div ref="select" class="i-select" :class="styleForField">
        <div class="select-title cursor-pointer" @click="onShow">
            {{ getSelects }}
        </div>
        <ul class="select-items">
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

    var storeNamespace = 'DataSingle';

    export default {
        name: 'i-base-select',
        model: {
            event: 'change'
        },
        props: {
            value: [String, Number, Object, Array],
            placeholder: {
                type: String,
                default: 'Please Select...'
            },
            desc: [String, Number, Object, Array],
            storeNamespace: [String, Object],
            fieldIndex: [String, Object],
            search: Boolean,
            multiple: Boolean,
            actions: Boolean,
            diff: [String, Number, Object, Array],
            release: Function,
            view: Function,
            icon: Object,
            type: {
                type: String,
                default: 'single'
            },
            items: {
                type: [Object, Array],
                default: () => []
            },
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
                searchText: '',
                selected: null,
            }
        },
        mounted() {
            window.onclick = function(event) {
                if (!event.target.matches('.select-title, .select-item, .select-search input, .select-actions div button'))
                    $('.select-items').removeClass('d-block')
            }
        },
        computed: {
            ...GlobalField.computed(storeNamespace),
            ...SelectField.computed
        },
        methods: {
            ...GlobalField.methods(storeNamespace),
            ...SelectField.methods
        },
        watch: {
            ...GlobalField.watch(storeNamespace),
            ...SelectField.watch
        }
    }

</script>
