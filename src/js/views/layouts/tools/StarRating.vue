<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 12/20/20, 11:20 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div class="i-star-rating">
        <div class="d-flex flex-wrap" :class="{'cursor-pointer': dynamic}">
            <div v-for="score in 5">
                <i @mouseover="hover(score)" @click="dynamic ? $emit('change', score) : () => {}" @mouseleave="setAllClass()" :class="styles[score]"></i>
            </div>
            <span v-if="star" class="badge badge-primary badge-pill h-20px" >{{ star }}</span>
        </div>
    </div>
</template>

<script>

    import StarRating from "../../../handel/functions/utils/star.rating.func";

    export default {
        name: "i-star-rating",
        props: {
            dynamic: {
                type: Boolean,
                default: true
            },
            star: {
                type: [Number, String],
                default: 0
            },
            styleIcon: {
                type: String,
                default: 'fa-2x'
            },
        },
        data() {
            return {
                styles: []
            }
        },
        created() {
            this.setAllClass()
        },
        methods: {
            ...StarRating.methods,
        },
        watch: {
            ...StarRating.watch,
        }
    }
</script>

<style scoped>

</style>
