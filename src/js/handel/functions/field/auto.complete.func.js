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
        itemsByFiltered: {
            handler: function (newValue) {
                var $this = this;
                if (!this.useModel){

                    var item = this.itemsByFiltered.filter(item => {
                        return item.value === $this._value
                    })
                    if(item.length) {
                        this.searchText = item[0].text;
                        this.selectText = item[0].text;
                    }
                    this.useModel = true;
                }
                this.checkItems();
            },
            deep: true
        },
        searchText: {
            handler: function (newValue, oldValue) {
                if (newValue !== this.selectText){
                    this.model = null;
                    this.selectText = '';
                }
                if (this.url && newValue !== oldValue && (!this._value || this.useModel)){
                    this.serverItems = [];
                    this.serverQuery.q = newValue;
                    this.serverQuery.page = 0;
                    this.serverQuery.pages = 1;
                    this.moreLoad()
                }
            },
            deep:true
        }
    }
};

export default AutoCompleteField;
