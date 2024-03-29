<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 1/24/21, 2:13 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <textarea v-if="type === 'textarea'" ref="input" :placeholder="placeholder" v-model="model"
              :class="styleForTextArea" @focusin="focusin"
              @focusout="focusout" :id="getIndex('datepicker') ? getIndex('datepicker') + '_input' : ''"></textarea>
    <input v-else ref="input" v-mask="getMask" :readonly="getOption('readonly')" :type="type" :placeholder="placeholder"
           :value="model" :class="styleForField"
           @focusin="focusin" @focusout="focusout" :id="getIndex('datepicker') ? getIndex('datepicker') + '_input' : false">
</template>


<script>
    import GlobalField from "../../../../handel/functions/field/global.func";
    import LoadSingleData from "../../../../handel/functions/store/loadSingle.func";

    export default {
        name: 'i-base-input',
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
        },
        data() {
            return {
                model: null,
            }
        },
        created() {
            LoadSingleData.setValueOnCreate(this)
        },
        mounted() {
            var $this = this;
            if (this.$attrs['data-toggle']) {
                $(this.$refs.input).css({
                    'direction': 'ltr',
                    'text-align': 'left !important;'
                })
                switch (this.$attrs['data-toggle']) {
                    case 'datepicker':
                        $(this.$refs.input).datepicker({
                            format: "yyyy/mm/dd",
                            todayBtn: "linked",
                            orientation: "bottom right",
                            autoclose: true,
                            todayHighlight: true
                        });
                        break;
                    case 'datetimepicker':
                        $(this.$refs.input).datetimepicker({
                            todayHighlight: !0,
                            autoclose: !0,
                            pickerPosition: "bottom-right",
                            todayBtn: !0,
                            format: "yyyy/mm/dd hh:ii"
                        });
                        break;
                    case 'datepickerpersian':
                    case 'datetimepickerpersian':
                        $(this.$refs.input).MdPersianDateTimePicker({
                            englishNumber: true,
                            enableTimePicker: this.$attrs['data-toggle'] === 'datetimepickerpersian',
                            targetTextSelector: "#" + $this.getIndex('datepicker') + "_input",
                        });
                        break;
                }
                if (['datepickerpersian', 'datetimepickerpersian'].indexOf(this.$attrs['data-toggle']) !== -1){
                    $(this.$refs.input).on('change', function (ev) {
                        $this.changeValue(ev.target.value);
                    });
                }else
                    $(this.$refs.input).on('changeDate', function (ev) {
                        $this.changeValue(date2str(ev.date, $this.$attrs['data-toggle'] === 'datepicker' ? "yyyy/MM/dd" : "yyyy/MM/dd hh:mm"));
                    });
            }else
                $(this.$refs.input).on('change', function (ev) {
                    $this.changeValue($this.getMask ? (ev.target.value).replace(/_/gi,'') : ev.target.value);
                });
        },
        computed: {
            ...GlobalField.computed(),
            styleForTextArea() {
                return this.styleForField + (this.resize ? ' resize-none' : '');
            }
        },
        methods: {
            ...GlobalField.methods(),
            changeValue(v) {
                this.model = v
            }
        },
        watch: {
            ...GlobalField.watch(),
        }
    }

</script>
