<template>
    <div>
        <div v-for="(item, index) in filteredAndSorted" :key="index">
            <label class="i-checkbox text-no-wrap">{{ item.title }}
                <input type="checkbox" @change="checking(item,null ,item.children)"
                       :checked="checked(item.id)" :value="item.id">
                <span class="checkmark fa color-blue"></span>
            </label>
            <label v-for="(child, cindex) in item.children" class="i-checkbox text-no-wrap ml-3">{{ child.title }}
                <input type="checkbox" @change="checking(item, child ,item.children)" :checked="checked(child.id)"
                       :value="child.id">
                <span class="checkmark fa color-blue"></span>
            </label>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'i-multi-checkbox',
        props: {
            items: [Object, Array],
            selected: [Object, Array],
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
            checking(item, child = null, children = null) {
                var $item = this.selected.findIndex(function(sub) {
                    return sub.id === item.id;
                });
                var $child = child ? this.selected.findIndex(function(sub) {
                    return sub.id === child.id;
                }) : -1 ;
                var $this = this;
                if ($item !== -1) {
                    this.selected.splice($item, 1);
                    if (child) {
                        if ($child !== -1)
                            this.selected.splice($child, 1);
                        else
                            this.selected.push(child);
                    }else{
                        $.each(children, function (i,v) {
                            var $child2 = $this.selected.findIndex(function(sub) {
                                return sub.id === v.id;
                            });
                            if ($child2 !== -1)
                                $this.selected.splice($child2, 1);
                        })
                    }
                } else {
                    if (child){
                        if ($child !== -1)
                            this.selected.splice($child, 1);
                        else
                            this.selected.push(child);
                    }else {
                        this.selected.push({id: item.id, title: item.title});
                        $.each(item.children, function (i,v) {
                            var $child2 = $this.selected.findIndex(function(sub) {
                                return sub.id === v.id;
                            });
                            if ($child2 === -1)
                                $this.selected.push(v);
                        })
                    }
                }
                this.$emit('update:selected', this.selected);
            },
            checked(item) {
                var $item = this.selected.findIndex(function(sub) {
                    return sub.id === item;
                });
                return $item !== -1;
            }
        }
    }

</script>
