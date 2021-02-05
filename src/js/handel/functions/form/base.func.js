/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 9/7/20, 8:36 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

const BaseForm = {
    methods: {
        fields(name = null) {
            var items = this.items ||  this.$store.getters[this.storeNamespace + '/iFields'];
            return name ? items[name] : items;
        }
    }
};

export default BaseForm;
