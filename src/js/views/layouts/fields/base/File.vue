<template>
    <div class="i-file w-100">
        <label class="m-0 d-block w-100">
            <div v-if="btn" class="btn-upload text-center cursor-pointer align-items-center justify-content-center" v-bind:class="{ multiple: multiple}">
                <template v-if="url && !multiple">
                    <div v-bind:style="{backgroundImage: 'url(' + url + ')'}"
                         class="w-72px h-72px w-md-100px h-md-100px w-lg-150px h-lg-150px bg-no-repeat bg-position-center bg-size-cover"></div>
                </template>
                <template v-else>
                    <div class="trh-icon-upload-cloud font-size-2-5 font-size-md-5"></div>
                    <div class="">Upload</div>
                </template>
            </div>
            <slot v-else name="action" v-bind:value="model" v-bind:url="url" v-bind:multiple="multiple"></slot>
            <input type="file" hidden @change="handleFileChange" :multiple="multiple"/>
        </label>
        <hr v-if="Object.keys(getUrls).length && multiple" class="border-primary m-0">
        <div v-if="getUrls && multiple" class="items flex flex-warp">
            <div v-for="(ur,  index) in getUrls" class="item m-2">
                <div v-bind:style="{backgroundImage: 'url(' + ur + ')'}"
                     class="w-72px h-72px w-md-100px h-md-100px w-lg-150px h-lg-150px bg-no-repeat bg-position-center bg-size-cover"></div>
                <span class="btn-cancel bg-white border border-primary btn btn-xs btn-icon d-flex" @click="delFile(index)">
                    <i class="trh-icon-cancel"></i>
                </span>
            </div>
            <!--<img :src="url" alt="upload" class="w-100">-->
        </div>
    </div>
</template>


<script>
    import GlobalField from "../../../../handel/functions/field/global.func";

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
            storeNamespace: [String, Object],
            fieldIndex: [String, Object],
            icon: Object,
            multiple: Boolean,
            btn: {
                type: Boolean,
                default: true
            },
            options: {
                type: [Object, Array],
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
                url: null
            }
        },
        computed: {
            ...GlobalField.computed(storeNamespace),
            getUrls() {
                return this.url || [];
            }
        },
        methods: {
            ...GlobalField.methods(storeNamespace),
            delFile(index) {
                iPath.del(this.url, index);
                this.model.splice(index,1);
                this.$forceUpdate();
            },
            handleFileChange($event) {
                var $this = this;
                var $files = $event.target.files || $event.dataTransfer.files;
                $this.model = $this.multiple && $this.model === null ? [] : $this.model;
                this.readURL($files);
                $.each($files, function (i, file) {
                    if ($this.multiple)
                        $this.model.push(file)
                    else
                        this.model = file
                })
            },
            readURL(files = []) {
                var $this = this;
                $this.url = $this.multiple && $this.url === null ? [] : $this.url;
                $.each(files, function (i, file) {
                    var reader = new FileReader();
                    reader.onload = e => {
                        if ($this.multiple)
                            $this.url.push(e.target.result)
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
        }
    }

</script>
