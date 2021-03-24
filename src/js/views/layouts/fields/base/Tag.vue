<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 11/20/20, 3:03 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <input ref="tags" class="form-control" :id="id? id+'_input' : ''" data-role="tagsinput"/>
</template>

<script>
    import Bloodhound from "typeahead.js/dist/bloodhound";
    import TokenService from "../../../../handel/services/system/token.service";
    import LoadSingleData from "../../../../handel/functions/store/loadSingle.func";
    import GlobalField from "../../../../handel/functions/field/global.func";


    export default {
        name: 'i-base-tag',
        props: {
            placeholder: String,
            id: String,
            url: String,
            value: [String, Number, Object, Array],
            desc: [String, Number, Object, Array],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object, Function],
            icon: Object,
            focusin: {
                type: Function,
                default: () => []
            },
            focusout: {
                type: Function,
                default: () => []
            },
            resize: Boolean,
            type: {
                type: String,
                default: 'text'
            },
            options: {
                type: [Object, Array, Function],
                default: () => []
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
            mask: [String, Number, Object, Array],
            items: {
                type: [Object, Array, Function],
                default: () => []
            }
        },
        data: () => {
            return {
                model: [],
                s_value: [],
                setAll: null,
                setEnter: false
            }
        },
        computed: {
            ...GlobalField.computed(),
            getItems() {
                return typeof (this.items) === 'function' ? this.items(this.getContext) : this.items;
            }
        },
        created() {
            LoadSingleData.setValueOnCreate(this)
        },
        mounted() {
            var $this = this;
            var options = this.options;
            if (this.url) {
                const tags = new Bloodhound({
                    datumTokenizer: datum => Bloodhound.tokenizers.whitespace(datum.value),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    remote: {
                        url: this.url,
                        prepare: function (query, settings) {
                            settings.url = settings.url + '?q=' + query
                            settings.headers = {
                                "Authorization": `Bearer ${TokenService.getToken()}`
                            };
                            return settings;
                        },
                        filter: points => points.data
                    }
                });
                tags.initialize();
                options.typeaheadjs.source = tags.ttAdapter()
                $(this.$refs.tags).tagsinput(options);
            }else if (typeof(this.getItems) === 'object' && this.getItems.length) {
                var model = this.model;
                options.typeaheadjs.source = function(query, syncResults){
                    var $items = $this.getItems.filter(item => {
                        return String(iPath.get(item, iPath.get(options, 'itemText'))).toUpperCase().indexOf(String(query).toUpperCase()) > -1;
                    });
                    if (!$items.length && model && Object.values(model).length)
                        $items = model.filter(item => {
                            return String(iPath.get(item, iPath.get(options, 'itemText'))).toUpperCase().indexOf(String(query).toUpperCase()) > -1;
                        });
                    syncResults($items);
                }
                $(this.$refs.tags).tagsinput(options);
                this.changeValue(model);
                this.$forceUpdate()
            }else{
                iPath.del(options, 'typeaheadjs')
                $(this.$refs.tags).tagsinput(options);
            }
            $(this.$refs.tags).on('itemAdded', function (event) {
                if ($this.setAll !== false) {
                    $this.s_value = Array.from($(this).tagsinput('items'));
                    $this.setEnter = true;
                }
            });
            $(this.$refs.tags).on('itemRemoved', function (event) {
                if ($this.setAll !== false) {
                    $this.s_value = Array.from($(this).tagsinput('items'));
                    $this.setEnter = true;
                }
            });
        },
        methods: {
            ...GlobalField.methods(),
            changeValue: function (event) {
                var $this = this;
                $this.setAll = false
                var $elm = $(this.$refs.tags);
                $elm.tagsinput('removeAll');
                $elm.val(event);
                var $timeout = 1000;
                $.each(event, function (i, v) {
                    $elm.tagsinput('add', v);
                    if (Object.keys(event).length - 1 === i)
                        $this.setAll = true;
                })
                setTimeout(function () {
                    $this.setAll = true;
                }, $timeout - 500)
            },
        },
        watch: {
            ...GlobalField.watch(),
            model: {
                handler: function (newValue, oldValue) {
                    if (!(this.getIndex('update') && this.getOption('store.update', true)) && newValue !== this.value)
                        this.$emit('change', newValue);
                    this.changeValue(newValue);
                },
                deep: true
            },
            s_value: {
                handler: function (newValue, oldValue) {
                    if (!_.isEqual(newValue, oldValue))
                        this.model = newValue
                },
                deep: true
            },
            getItems: {
                handler: function (newValue, oldValue) {
                    if (typeof(newValue) === 'object' && newValue.length) {
                        var options = this.options;
                        var model = this.model;
                        $(this.$refs.tags).tagsinput('destroy');
                        if(options.typeaheadjs){
                            options.typeaheadjs.source = function(query, syncResults){
                                var $items = newValue.filter(item => {
                                    return String(iPath.get(item, iPath.get(options, 'itemText'))).toUpperCase().indexOf(String(query).toUpperCase()) > -1;
                                });
                                if (!$items.length && model && Object.values(model).length)
                                    $items = model.filter(item => {
                                        return String(iPath.get(item, iPath.get(options, 'itemText'))).toUpperCase().indexOf(String(query).toUpperCase()) > -1;
                                    });
                                syncResults($items);
                            }
                        }
                        $(this.$refs.tags).tagsinput(options);
                        this.changeValue(model);
                        this.$forceUpdate()
                    }
                },
                deep: true
            }
        }

    }
</script>
