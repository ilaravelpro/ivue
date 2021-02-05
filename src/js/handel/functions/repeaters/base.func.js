/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 9/25/20, 7:32 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

const BaseRepeater = {
    computed: {
    },
    methods: {
        addRow: function() {
            var add = null;
            if (this.type === 'single')
                add = null;
            else {
                add = {};
                $.each(this.items, function (i, item) {
                    add[item.name] = null;
                });
            }
            if (this.getValue(this.getIndex('get'))){
                this.updateValue(this.getIndex('update') + '.' + Number(Object.keys(this.getValue(this.getIndex('get'))).length), add)
            }
            else {
                this.updateValue(this.getIndex('update') , [add])
            }
            this.$forceUpdate()
        },
        removeRow: function(index) {
            if (confirm('Are you sure you want to delete this element?')) {
                this.delValue(this.getIndex('get') + '.' + index)
                this.$forceUpdate()
            }
        },
    }
};

export default BaseRepeater;
