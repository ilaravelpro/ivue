/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/26/20, 3:19 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

const CheckboxField = {
    computed: {
        getCheck() {
            if (this.getIndex('get') && this.getOption('store.get', true)) {
                this.checked = Boolean(this.model);
            } else {
                this.checked = Boolean(this.value);
            }
            switch (this.checked) {
                case 'true':
                    this.checked = true;
                    break;
                case 'false':
                    this.checked = false;
                    break;
            }
            return this.checked;
        }
    },
    methods: {
        changeValue: function () {
            this.checked = !this.getCheck;
        },
    },
    watch: {
        checked: {
            handler: function (newValue) {
                if (typeof (newValue) !== "undefined") {
                    this.model = newValue ? true : false
                }
            }
        }
    }
};

export default CheckboxField;
