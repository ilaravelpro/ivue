const AutoCompleteField = {
    methods: {
        onSelect(item, index) {
            this._onSelect(item, index)
            this.setSelect(null, index)
            $(this.$refs.select).find('ul').removeClass('d-block');
        },
        setSelect(item, index) {
            if (!item) item = this.itemsByFiltered[index];
            this.model = this.getType === 'single' ? item.value : item;
            this.searchText = item.text;
            this.selectText = item.text;
        }
    },
    watch: {
        _value: {
            handler: function (newValue, oldValue) {
                if (this.getIndex('update') &&
                    this.getOption('store.update', true) &&
                    typeof (newValue) !== 'undefined' &&
                    newValue !== oldValue)
                    this.updateValue(this.getIndex('update'), this.model);
                var item = this.getType === 'single' ? this.itemsByFiltered.filter(item => {
                    return item.value === newValue
                }) : [newValue]
                if(item.length) {
                    this.searchText = item[0].text;
                    this.selectText = item[0].text;
                }
                this.checkItems();
            },
            deep:true
        },
    }
};

export default AutoCompleteField;
