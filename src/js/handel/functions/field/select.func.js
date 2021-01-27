const SelectField = {
    computed: {
        _value() {
            return this.model || this.value || null;
        },
        getSelects() {
            var $this = this;
            if (this.multiple) {
                return this._value && typeof (this._value) === 'object' && Object.keys(this._value).length ? Object.keys(this._value).length + " Selected" : this.placeholder;
            } else {
                var $select = this._value;
                if (this.getType === 'single') {
                    $.each(this.itemsByFiltered, function (i, v) {
                        if (v.value === $select) $select = v;
                    })
                }
                return this._value && typeof ($select) !== 'undefined' && $select.text ? $select.text : this.placeholder;
            }
        },
        getItems() {
            return typeof (this.items) === 'function' ? this.items(this) : this.items;
        },
        itemsByFiltered() {
            var $this = this;
            var $items = this.releaseItems([...this.firstItems, ...(this.getUrl ? this.serverItems : this.getItems)]);
            var $uniq = [];
            $items = $items.filter(item => {
                if ($uniq.indexOf(item.value) !== -1) return false;
                $uniq.push(item.value)
                var $diff = true;
                var diff = this.getIndex('diff') !== this.getIndex('store') ? this.getValue(this.getIndex('diff')) : $this.diff;
                if (diff && typeof (diff) === 'object') {
                    $.each(diff, function (i, v) {
                        if ($diff) $diff = v.value ? v.value !== item.value : v !== item.value;
                    })
                } else
                    $diff = diff !== item.value;
                var $search = String(item.text).toUpperCase().indexOf(String($this.searchText).toUpperCase()) > -1;
                return $diff ? $search : false;
            });

            return $items;
        },
        getUrl() {
            return typeof (this.url) === 'function' ? this.url(this) : this.url;
        },
        getQuery() {
            return typeof (this.query) === 'function' ? this.query(this) : this.query;
        },
        getType() {
            return this.type;
        },
        getUseFirst() {
            return this._value ? false : this.useFirst
        }
    },
    methods: {
        deSelect() {
            this.model = null;
            $(this.$refs.select).find("ul li").removeClass("selected");
        },
        selectAll() {
            var $this = this;
            this.model = [];
            $(this.$refs.select).find("ul li").removeClass("selected");
            $.each(this.itemsByFiltered, function (i, v) {
                $this.model.push(v);
                $($this.$refs.select).find("ul li[data-value='" + v.value + "']").addClass("selected");
            })
        },
        onShow() {
            if ($(this.$refs.items).hasClass('d-block'))
                $(this.$refs.items).removeClass('d-block');
            else {
                $('.i-select').find('ul').removeClass('d-block');
                $(this.$refs.items).addClass('d-block');
            }
        },
        onSelect(item, index) {
            this._onSelect(item, index)
        },
        _onSelect(item, index) {
            if (!item) item = this.itemsByFiltered[index];
            var $this = this;
            var container = $(this.$refs.select);
            var $elm = container.find("ul li[data-value='" + item.value + "']");
            if (this.multiple) {
                if ($elm.hasClass("selected")) {
                    $elm.removeClass("selected");
                    this.model = this.model.filter(function (v, i) {
                        return ($this.getType === 'single' && typeof (v) == 'object' ? v.value : v) !== ($this.getType === 'single' && typeof (item) === 'object' ? item.value : item);
                    })
                    this.model = this.model.map(function (item, index, array) {
                        return $this.getType === 'single' && typeof (item) === 'object' ? item.value : item;
                    })
                } else {
                    $elm.addClass("selected");
                    if (!this.model) this.model = [];
                    this.model.push($this.getType === 'single' && typeof (item) === 'object' ? item.value : item);
                }
            } else {
                if ($elm.hasClass("selected")) {
                    $elm.removeClass("selected");
                    this.model = null;
                } else {
                    container.find("ul li").removeClass("selected");
                    $elm.addClass("selected");
                    this.model = this.getType === 'single' && typeof (item) === 'object' ? item.value : item;
                }
                this.onShow()
            }
            return item
        },
        setSelect(item, index) {
            if (!item) item = this.itemsByFiltered[index];
            this.model = this.getType === 'single' ? item.value : item;
        },
        filtering(event) {
            if (!$(this.$refs.select).find('ul').hasClass('d-block')) $(this.$refs.select).find('ul').addClass('d-block');
            if (["ArrowDown", "ArrowUp", "Enter"].indexOf(event.key) !== -1 && !this.multiple) {
                this.keyControl(event, $(this.$refs.select))
            }
        },
        keyControl(e, container) {
            if (e.key === "ArrowDown") {
                if (container.find("ul li").hasClass("selected")) {
                    if (container.find("ul li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length) {
                        var $next = container.find("ul li.selected").removeClass("selected").nextAll().not('[style*="display: none"]').first().addClass("selected");
                        this.selecting = $next.attr('data-key')
                        if (this.selecting && this.$options.name === 'i-select') this.setSelect(null, this.selecting)
                    }
                } else {
                    var $first = container.find("ul li:first-child");
                    if (this.$options.name === 'i-select') $first = $first.next()
                    $first.addClass("selected");
                    this.selecting = $first.attr('data-key')
                    if (this.selecting && this.$options.name === 'i-select') this.setSelect(null, this.selecting)
                }
            } else if (e.key === "ArrowUp") {
                if (container.find("ul li:visible").index(container.find("ul li.selected")) > 0) {
                    var $prev = container.find("ul li.selected").removeClass("selected").prevAll().not('[style*="display: none"]').first().addClass("selected");
                    this.selecting = $prev.attr('data-key')
                    if (this.selecting && this.$options.name === 'i-select') this.setSelect(null, this.selecting)
                }
            } else if (e.key === "Enter") {
                if (this.selecting) this.setSelect(null, this.selecting)
                $(this.$refs.select).find('ul').removeClass('d-block');
            }
            if (container.find("ul li.selected").length)
                container.find("ul li.selected")[0].scrollIntoView({
                    behavior: "smooth",
                });
        },
        releaseItems(items) {
            var $this = this;
            var $items = Array.from(items);
            return $items.map(function (value, index) {
                return $this.releaseItem(value, index)
            })
        },
        releaseItem(value, index = 0) {
            var $this = this;
            if (typeof (this.release) === 'function')
                return this.release(value, index)
            else {
                if (typeof (value) === "object")
                    if (typeof (this.release) === 'object') {
                        value['text'] = value[this.release.text];
                        value['value'] = value[this.release.value];
                        return value
                    } else if (typeof (value.title) !== "undefined") {
                        value['text'] = value.title || value.name;
                        value['value'] = value.name || value.id;
                        return value
                    } else
                        return value;
                else {
                    return {
                        text: value,
                        value: value
                    }
                }
            }
        },
        viewItem(item, index = 0, items) {
            if (typeof (this.view) === 'function')
                return this.view(item, index, items)
            else
                return item.text;
        },
        checkItems() {
            iProcessing.init(this.fieldIndex, this, function ($this) {
                var container = $($this.$refs.select);
                container.find("ul li").removeClass("selected");
                if ($.isArray($this._value) && $this.multiple) {
                    setTimeout(function () {
                        $.each($this._value, function (i, v) {
                            if (container.find("ul li[data-value='" + ($this.getType === 'single' && !$.isArray(v) ? v : v.value) + "']").length)
                                container.find("ul li[data-value='" + ($this.getType === 'single' && !$.isArray(v) ? v : v.value) + "']").addClass("selected");
                        })
                    }, 500)
                } else if ($this._value) {
                    container.find("ul li[data-value='" + ($this.getType === 'single' && !$.isArray($this._value) ? $this._value : $this._value.value) + "']").addClass("selected");
                }
                if ($this.firstSelect && (!$this.url || ($this.url && $this.loading)))
                    if ($this.itemsByFiltered.length && $this.$options.name !== 'i-base-autocomplete' && !$this.multiple && $this._value && !$this._value.length && !$this.useFirst) {
                        $this.setSelect(null, 0)
                    }

            }, 1000)
        },
        moreLoad() {
            var $this = this;
            this.loading = true;
            if ($this.getUrl)
                if (/*!$this.useModel && $this.model || */$this.serverQuery.page < $this.serverQuery.pages) {
                    /*if ($this.useModel) $this.serverQuery.page++;
                    if (!$this.useModel) {
                        $this.serverQuery.q = $this.model
                    }*/
                    ApiService.get($this.getUrl, {...$this.serverQuery, ...$this.getQuery}).then(response => {
                        if ($this.serverQuery.page > 1) $this.serverItems.push(...response.handel.data);
                        else $this.serverItems = response.handel.data;
                        $this.serverQuery.pages = response.handel.meta.last_page;
                        $this.loading = false;
                        /*if (!$this.useModel && Object.keys(response.handel.data).length === 1) {
                            $this.searchText = typeof ($this.release) === 'object' ? response.handel.data[0][$this.release['text']] : response.handel.data[0].name || response.handel.data[0].title || response.handel.data[0].text;
                        }*/
                        /*setTimeout(function () {
                            $this.useModel = true;
                        }, 100)*/
                    })
                }
        }
    },
    watch: {
        getUrl: {
            handler: function (newValue, oldValue) {
                if (this.getUrl && !_.isEqual(newValue, oldValue)) {
                    this.serverItems = [];
                    this.serverQuery.q = '';
                    this.serverQuery.page = 0;
                    this.serverQuery.pages = 1;
                    this.moreLoad()
                }
            },
            deep: true
        },
        getQuery: {
            handler: function (newValue, oldValue) {
                if (this.getUrl && !_.isEqual(newValue, oldValue)) {
                    this.serverItems = [];
                    this.serverQuery.q = '';
                    this.serverQuery.page = 0;
                    this.serverQuery.pages = 1;
                    this.moreLoad()
                }
            },
            deep: true
        },
        _value: {
            handler: function (newValue, oldValue) {
                var $this = this;
                if (this.getIndex('update') &&
                    this.getOption('store.update', true) &&
                    typeof (newValue) !== 'undefined' &&
                    (!this.iRecordValue || newValue !== oldValue))
                    this.updateValue(this.getIndex('update'), this.model);
                this.checkItems();
                if (!$this.useModel)
                    this.moreLoad()
            },
            deep: true
        },
        itemsByFiltered: {
            handler: function (newValue) {
                this.checkItems();
            },
            deep: true
        },
        searchText: {
            handler: function (newValue, oldValue) {
                if (this.getUrl && newValue !== oldValue) {
                    this.serverItems = [];
                    this.serverQuery.q = newValue;
                    this.serverQuery.page = 0;
                    this.serverQuery.pages = 1;
                    this.moreLoad()
                }
            },
            deep: true
        }
    }
};

export default SelectField;
