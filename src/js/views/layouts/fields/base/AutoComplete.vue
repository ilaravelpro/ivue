<template>
    <div ref="select" class="i-autocomplete" :class="styleForField">
        <div class="select-title select-search cursor-pointer">
            <div class="input-group">
                <input ref="search" type="text" :placeholder="placeholder" class="form-control border-0 m-0 p-0 h-auto"
                       @keyup="filtering($event)" v-model="searchText" @focusin="focusin" @focusout="focusout">
            </div>
        </div>
        <ul class="select-items w-sm-250px">
            <li class="select-item" v-for="(item, index) in itemsByFiltered" :data-key="index"
                :data-value="item.value"
                @click="onSelect(item, index, $event)" v-html="viewItem(item, index, itemsByFiltered)">
            </li>
        </ul>
    </div>
</template>


<script>
    import GlobalField from "../../../../handel/functions/field/global.func";
    import SelectField from "../../../../handel/functions/field/select.func";
    import AutoCompleteField from "../../../../handel/functions/field/auto.complete.func";

    var storeNamespace = 'DataSingle';

    export default {
        name: 'i-base-autocomplete',
        model: {
            event: 'change'
        },
        props: {
            value: [String, Number, Object, Array],
            placeholder: {
                type: String,
                default: 'Please Type...'
            },
            desc: [String, Number, Object, Array],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object],
            diff: [String, Number, Object, Array],
            release: Function,
            view: Function,
            focusin: Function,
            focusout: Function,
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
                selectText: '',
                selected: null,
                search: true,
                selecting: null
            }
        },
        mounted() {
            window.onclick = function (event) {
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
            ...SelectField.methods,
            ...AutoCompleteField.methods,
        },
        watch: {
            ...GlobalField.watch(storeNamespace),
            ...SelectField.watch,
            ...AutoCompleteField.watch,
        }
    }

</script>
