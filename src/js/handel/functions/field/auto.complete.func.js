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
            this.model = this.type === 'single' ? item.value : item;
            this.searchText = item.text;
            this.selectText = item.text;
        },
        moreLoad() {
            var $this = this;
            this.loading = true;
            setTimeout(function () {
                if ($this.serverQuery.page < $this.serverQuery.pages){
                    $this.serverQuery.page++;
                    $this.useModel = this.model && this.model === this.selectText;
                    if (!$this.useModel){
                        $this.serverQuery.q = $this.model
                    }
                    ApiService.get($this.url, {...$this.serverQuery, ...$this.query}).then(response => {
                        $this.serverItems.push(...response.handel.data);
                        $this.serverQuery.pages = response.handel.meta.last_page;
                        $this.loading = false;
                        if (!$this.useModel && Object.keys(response.handel.data).length === 1){
                            $this.selectText = typeof($this.release) === 'object' ? response.handel.data[0][$this.release['text']]: response.handel.data[0].name || response.handel.data[0].title;
                            $this.searchText = $this.selectText;
                        }
                        setTimeout(function () {
                            $this.useModel = true;
                        }, 100)

                    })
                }
            }, 1000)
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
                var item = this.itemsByFiltered.filter(item => {
                    return item.value === newValue
                })
                if(item.length) {
                    this.searchText = item[0].text;
                    this.selectText = item[0].text;
                }
                this.checkItems();
                this.useModel = this.model === this.selectText;
                if (this.url && !this.useModel){
                    this.serverItems = [];
                    this.serverQuery.q = this.model;
                    this.serverQuery.page = 0;
                    this.serverQuery.pages = 1;
                    this.moreLoad()
                }
            },
            deep:true
        },
        searchText: {
            handler: function (newValue, oldValue) {
                if (newValue !== this.selectText){
                    this.model = null;
                    this.selectText = '';
                }
                if (this.url && newValue !== oldValue && this.useModel){
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
