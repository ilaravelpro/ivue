<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 12/20/20, 11:20 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div class="i-star-rating">
        <div class="d-flex flex-wrap cursor-pointer mx-2">
            <div v-for="score in 5">
                <i class="fa-2x" @mouseover="hover(score)" @click="$emit('change', score)" @mouseleave="setAllClass()" :class="styles[score]"></i>
            </div>
            <span class="badge badge-primary badge-pill h-20px" >{{ star }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "i-star-rating",
        data() {
            return {
                star: 2.5,
                styles: []
            }
        },
        created() {
            this.setAllClass()
        },
        methods: {
            setAllClass(star = null) {
                var $this = this;
                $.each([1,2,3,4,5], function (k, v) {
                    $this.getClass(v, star);
                })
                this.$forceUpdate()
            },
            getClass(score, star = null) {
                if (!star) star = this.star;
                if (score <= star) return this.styles[score] = "fas fa-star";
                if (score === star + 0.5) return  this.styles[score] = "fas fa-star-half-alt";
                return this.styles[score] =  "far fa-star";
            },
            hover(score) {
                this.setAllClass(score)
                return this.styles[score];
            }
        },
        watch: {
            star: {
                handler:  function () {
                    this.setAllClass()
                },
                deep:true
            }
        }
    }
</script>

<style scoped>

</style>
