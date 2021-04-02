/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 3/27/21, 12:17 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

const StarRating = {
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
            if (score <= star) return this.styles[score] = "fas fa-star " + this.styleIcon;
            if (score === star + 0.5) return  this.styles[score] = "fas fa-star-half-alt " + this.styleIcon;
            this.styles[score] =  "far fa-star " + this.styleIcon;
            return this.styles[score];
        },
        hover(score) {
            if (this.dynamic){
                this.setAllClass(score)
                return this.styles[score];
            }
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
};

export default StarRating;
