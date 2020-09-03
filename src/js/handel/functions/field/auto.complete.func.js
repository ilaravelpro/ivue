const AutoCompleteField = {
    computed: {

    },
    methods: {
        onSelect(item, index) {
            this._onSelect(item, index)
            this.setSelect(null, index)
            $(this.$refs.select).find('ul').removeClass('d-block');
        },
        setSelect(item, index) {
            if (!item) item = this.itemsByFiltered[index];
            this.selected = this.type === 'single' ? item.value : item;
            this.searchText = item.text;
            this.selectText = item.text;
        },
    },
    watch: {
        searchText: {
            handler: function (newValue) {
                if (newValue !== this.selectText){
                    this.selected = null;
                    this.selectText = '';
                }
            },
            deep:true
        }
    }
};

export default AutoCompleteField;
