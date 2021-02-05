<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 7/28/20, 8:30 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div>
        <div v-for="(item, index) in filteredAndSorted" :key="index">
            <label class="i-radio text-no-wrap">
                <span class="title">{{ item.title }}</span>
                <input type="radio" @change="checking(item)"
                       :checked="checked(item)" :value="item.id">
                <span class="checkmark trh-icon color-blue"></span>
            </label>
            <label v-for="(child, cindex) in item.children" class="i-radio text-no-wrap ml-3">
                <span class="title">{{ child.title }}</span>
                <input type="radio" @change="checking(child)" :checked="checked(child)"
                       :value="child.id">
                <span class="checkmark trh-icon color-blue"></span>
            </label>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'i-radio',
        props: {
            items: [Object, Array],
            selected: [Object, Array, String, Number],
            search_attr: String,
            search: {
                type: String,
                default: ''
            },
        },
        computed: {
            filteredAndSorted() {
                function compare(a, b) {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }

                return this.items.filter(item => {
                    var $has = item[this.search_attr].toLowerCase().includes(this.search.toLowerCase());
                    if (!$has && item.children && Object.keys(item.children).length > 0) {
                        var children = item.children.filter(child => {
                            return child[this.search_attr].toLowerCase().includes(this.search.toLowerCase())
                        }).sort(compare);
                        $has = Object.keys(children).length > 0;
                    }
                    return $has;
                }).sort(compare)
            }
        },
        methods: {
            checking(item) {
                this.$emit('update:selected', item);
            },
            checked(item) {
                var selected = this.selected.title ? this.selected : this.items[0];
                this.$emit('update:selected', selected);
                return selected.id === item.id;
            },
        }
    }

</script>
