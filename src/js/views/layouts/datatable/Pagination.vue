<template>
    <ul class="pagination">
        <li class="page-item" @click="previous()">
            <a class="page-link" aria-label="Previous" :aria-disabled="current === 1">
                <i class="fa fa-chevron-left font-size-12 color-black d-inline-flex"></i>
            </a>
        </li>
        <template v-if="pages && current && pageList" v-for="i in pageList" >
            <li v-if="i === 0" class="page-item page-split" ><span class="page-link color-black" >...</span></li>
            <li v-else :class="`page-item ${current === i ? 'active' : ''}`" @click="click(i)"><a
                class="page-link color-black" v-text="i"></a></li>
        </template>
        <li class="page-item" @click="next()">
            <a class="page-link" aria-label="Next" :aria-disabled="current === pages">
                <i class="fa fa-chevron-right font-size-12 color-black d-inline-flex"></i>
            </a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "i-datatable-pagination",
        props: {
            current: [Number, String],
            pages: Number,
        },
        computed: {
            page: {
                get: function () {
                    return this.current;
                },
                set: function (value) {
                    this.$emit('update:current', value);
                }
            },
            pageList() {
                return this.getPageList(this.pages || 1, this.current || 1, 6);
            }
        },
        methods: {
            click(i) {
                this.page = i;
            },
            next() {
                if (this.current < this.pages) {
                    this.page++;
                }
            },
            previous() {
                if (this.current > 1) {
                    this.page--;
                }
            },
            getPageList(totalPages, page, maxLength) {
                if (maxLength < 5) throw "maxLength must be at least 5";

                function range(start, end) {
                    return Array.from(Array(end - start + 1), (_, i) => i + start);
                }

                var sideWidth = maxLength < 9 ? 1 : 2;
                var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
                var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
                if (totalPages <= maxLength) {
                    // no breaks in list
                    return range(1, totalPages);
                }
                if (page <= maxLength - sideWidth - 1 - rightWidth) {
                    // no break on left of page
                    return range(1, maxLength - sideWidth - 1)
                        .concat(0, range(totalPages - sideWidth + 1, totalPages));
                }
                if (page >= totalPages - sideWidth - 1 - rightWidth) {
                    // no break on right of page
                    return range(1, sideWidth)
                        .concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
                }
                // Breaks on both sides
                return range(1, sideWidth)
                    .concat(0, range(page - leftWidth, page + rightWidth),
                        0, range(totalPages - sideWidth + 1, totalPages));
            }
        },

    }
</script>

<style scoped>
    .pagination > li:not(.page-split) {
        cursor: pointer;
    }
    .pagination > .page-split {
        cursor: default;
    }
</style>
