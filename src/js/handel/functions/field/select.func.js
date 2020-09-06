const SelectField = {
    computed: {
        _value() {
            return this.selected || this.value || null;
        },
        getSelects() {
            if (this.multiple) {
                return this._value && typeof (this._value) === 'object' && Object.keys(this._value).length ? Object.keys(this._value).length + " Selected" : this.placeholder;
            } else {
                var $select = this._value;
                if (this.type === 'single') {
                    $.each(this.itemsByFiltered, function (i, v) {
                        if (v.value === $select) $select = v;
                    })
                }
                return this._value && typeof ($select) !== 'undefined' && $select.text ? $select.text : this.placeholder;
            }
        },
        itemsByFiltered() {
            var $this = this;
            var $items = this.releaseItems([...this.firstItems, ...(this.url ? this.serverItems: this.items)]);
            $items = $items.filter(item => {
                var $diff = true;
                if ($this.diff && typeof ($this.diff) === 'object') {
                    $.each($this.diff, function (i, v) {
                        if ($diff) $diff = v.value ? v.value !== item.value : v !== item.value;
                    })
                } else
                    $diff = $this.diff !== item.value;
                var $search = this.url ? String(item.text).toUpperCase().indexOf(String($this.searchText).toUpperCase()) > -1 : true;
                return $diff ? $search : false;
            });
            return $items;
        },
    },
    methods: {
        deSelect() {
            this.selected = null;
            $(this.$refs.select).find("ul li").removeClass("selected");
        },
        selectAll() {
            var $this = this;
            this.selected = [];
            $(this.$refs.select).find("ul li").removeClass("selected");
            $.each(this.itemsByFiltered, function (i, v) {
                $this.selected.push(v);
                $($this.$refs.select).find("ul li[data-value='" + v.value + "']").addClass("selected");
            })
        },
        onShow() {
            if ($(this.$refs.select).find('ul').hasClass('d-block'))
                $(this.$refs.select).find('ul').removeClass('d-block');
            else {
                $('.i-select').find('ul').removeClass('d-block');
                $(this.$refs.select).find('ul').addClass('d-block');
            }
        },
        onSelect(item, index) {
            this._onSelect(item, index)
        },
        _onSelect(item, index) {
            if (!item) item = this.itemsByFiltered[index];
            var container = $(this.$refs.select);
            var $elm = container.find("ul li[data-value='" + item.value + "']");
            if (this.multiple) {
                if ($elm.hasClass("selected")) {
                    $elm.removeClass("selected");
                    this.selected = this.selected.filter(function (v, i) {
                        return v.value !== item.value;
                    })
                } else {
                    $elm.addClass("selected");
                    if (!this.selected) this.selected = [];
                    this.selected.push(item);
                }
            } else {
                if ($elm.hasClass("selected")) {
                    $elm.removeClass("selected");
                    this.selected = null;
                } else {
                    container.find("ul li").removeClass("selected");
                    $elm.addClass("selected");
                    this.selected = this.type === 'single' ? item.value : item;
                }
            }
            return item
        },
        setSelect(item, index) {
            if (!item) item = this.itemsByFiltered[index];
            this.selected = this.type === 'single' ? item.value : item;
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
                    this.selecting =  $first.attr('data-key')
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
    },
    watch: {
        selected: {
            handler: function (newValue) {
                this.$emit('change', newValue);
            },
            deep: true
        },
        itemsByFiltered: {
            handler: function (newValue) {
                var $this = this;
                var container = $(this.$refs.select);
                container.find("ul li").removeClass("selected");
                if (typeof (this._value) === 'object') {
                    setTimeout(function () {
                        $.each($this._value, function (i, v) {
                            if (container.find("ul li[data-value='" + v.value + "']").length)
                                container.find("ul li[data-value='" + v.value + "']").addClass("selected");
                        })
                    }, 500)
                } else if (this._value && typeof (this._value) !== 'object') {
                    setTimeout(function () {
                        container.find("ul li[data-value='" + $this._value + "']").addClass("selected");
                    }, 500)
                }
            },
            deep: true
        },
        searchText: {
            handler: function (newValue, oldValue) {
               if (newValue !== oldValue){
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
