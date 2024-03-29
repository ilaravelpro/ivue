<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 2/2/21, 11:54 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div class="w-100" :class="{'i-file': !getOption('just-input')}">
        <input v-if="getOption('just-input')" type="file" :class="styleForField" @change="handleFileChange" :multiple="multiple"/>
        <template v-else>
            <label class="m-0 d-block w-100">
                <div v-if="btn" class="btn-upload text-center cursor-pointer align-items-center justify-content-center " v-bind:class="{ multiple: multiple}">
                    <template v-if="getUrls && !multiple">
                        <div v-bind:style="{backgroundImage: 'url(' + getUrls + ')'}"
                             class="w-72px h-72px w-md-100px h-md-100px w-lg-150px h-lg-150px bg-no-repeat bg-position-center bg-size-cover"></div>
                    </template>
                    <div class="w-72px h-72px w-md-100px h-md-100px w-lg-150px h-lg-150px pt-2" v-else>
                        <div class="fa fa-cloud-upload-alt font-size-1-5 font-size-md-5"></div>
                        <div class="font-size-0-8 font-size-md-1-2">{{ btnTitle }}</div>
                    </div>
                </div>
                <slot v-else name="action" v-bind:value="model" v-bind:url="url" v-bind:multiple="multiple"></slot>
                <input type="file" hidden @change="handleFileChange" :multiple="multiple"/>
            </label>
            <hr v-if="multiple && Object.keys(getUrls).length" class="border-primary m-0">
            <div v-if="getUrls && multiple" class="items flex flex-warp">
                <div v-for="(ur,  index) in getUrls" class="item m-2">
                    <div v-bind:style="{backgroundImage: 'url(' + ur.url + ')'}"
                         class="w-72px h-72px w-md-100px h-md-100px w-lg-150px h-lg-150px bg-no-repeat bg-position-center bg-size-cover"></div>
                    <span class="btn-cancel bg-white border border-primary btn btn-xs btn-icon fas fa-trash-alt d-flex" @click="delFile(index)">
                </span>
                </div>
            </div>
        </template>
    </div>
</template>


<script>
    import GlobalField from "../../../../handel/functions/field/global.func";
    import LoadSingleData from "../../../../handel/functions/store/loadSingle.func";

    var storeNamespace = 'DataSingle';

    export default {
        name: 'i-base-file',
        model: {
            event: 'change'
        },
        props: {
            placeholder: String,
            value: [String, Number, Object, Array],
            desc: [String, Number, Object, Array],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object, Function],
            icon: Object,
            multiple: Boolean,
            btn: {
                type: Boolean,
                default: true
            },
            btnTitle: {
                type: String,
                default: 'Upload'
            },
            options: {
                type: [Object, Array, Function],
                default: () => []
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
        },
        data() {
            return {
                model: null,
                url: null,
                deletes: [],
                files: [],
            }
        },
        created() {
            LoadSingleData.setValueOnCreate(this)
        },
        computed: {
            ...GlobalField.computed(storeNamespace),
            getUrls() {
                var $this = this;
                var files = this.multiple ? [] : null;
                if (this.getIndex('get') && this.getOption('get', true)) {
                    var list = this.getValue(this.getIndex('get'));
                    if (this.multiple && list)
                        list.forEach(function (value, index, array) {
                            if ($this.deletes.indexOf(value['150x'].attachment) === -1)
                                files.push({
                                    id: value['150x'].attachment,
                                    url: value['150x'].url
                                });
                        })
                    else if (list && list['150x'])
                        files = list ? list['150x'].url : null;
                }
                this.files = files;
                if (this.multiple && this.url)
                    files.push(...this.url)
                return this.multiple ? files : (this.url || files);
            }
        },
        methods: {
            ...GlobalField.methods(storeNamespace),
            delFile(index) {
                var $urls = this.getUrls
                if ($urls[index] && $urls[index].id && this.getIndex('delete') && this.getOption('delete', true)) {
                    var $deletes = this.getValue(this.getIndex('delete'), []);
                    $deletes.push($urls[index].id);
                    this.updateValue(this.getIndex('delete'), $deletes)
                    this.deletes = $deletes
                }else{
                    var $index = index - Object.values(this.files).length;
                    iPath.del(this.url, $index);
                    this.model.splice($index,1);
                }
                this.$forceUpdate();
            },
            handleFileChange($event) {
                var $this = this;
                var $files = $event.target.files || $event.dataTransfer.files;
                $this.model = $this.multiple && $this.model === null ? [] : $this.model;
                $.each($files, function (i, file) {
                    if ($this.multiple)
                        $this.model.push(file)
                    else{
                        $this.model = file
                    }
                })
                this.readURL($files);
            },
            readURL(files = []) {
                var $this = this;
                $this.url = $this.multiple && $this.url === null ? [] : $this.url;
                $.each(files, function (i, file) {
                    var reader = new FileReader();
                    reader.onload = e => {
                        if ($this.multiple)
                            $this.url.push({
                                url: e.target.result
                            })
                        else
                            $this.url = e.target.result
                        $this.$forceUpdate();
                    };
                    reader.readAsDataURL(file);
                })
            }
        },
        watch: {
            ...GlobalField.watch(storeNamespace),
            iRecordValue: {
                handler: function (newValue, oldValue) {

                },
                deep: true
            },
        }
    }

</script>
