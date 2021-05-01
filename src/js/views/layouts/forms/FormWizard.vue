<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 11/4/20, 10:55 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div class="i-form-wizard" :class="_style">
        <h4 v-if="stepTitle">{{ tabs[current].title }}</h4>
        <div class="steps">
            <ul class="my-0 pl-2" :class="_style_nav" role="tablist"
                :aria-orientation="_orientation">
                <li v-for="(tab, index) in getTabs"
                    :class="_style_nav_item(index)" @click="current = index" :style="`width: ${ 100  / Object.keys(getTabs).length }%`">
                    <a :id="`${_id(tab.name)}_tab`" data-toggle="tab"
                       :href="`#${_id(tab.name)}`" role="tab" :aria-controls="_id(tab.name)" aria-selected="true">
                    </a>
                </li>
            </ul>
        </div>
        <div class="content px-2">
            <div class="tab-content" :class="_style_contents">
                <div v-for="(tab, index) in getTabs" class="tab-pane fade show" :class="_style_content(index)"
                     :id="_id(tab.name)" role="tabpanel" :aria-labelledby="`${_id(tab.name)}_tab`">
                    <template v-if="tab.items" v-for="item in tab.items">
                        <component :is="item.component" v-bind="item.attrs" :storeNamespace="item.attrs.storeNamespace || storeNamespace"/>
                    </template>
                </div>
            </div>
        </div>
        <div class="actions align-items-center justify-content-center mt-2">
            <div :class="current === 0? 'd-none' : ''">
                <a @click="current--">Backward</a>
            </div>
            <div :class="current > Object.keys(getTabs).length - 2? 'd-none' : ''">
                <a @click="current++">Forward</a>
            </div>
            <div :class="current < Object.keys(getTabs).length - 1? 'd-none' : ''" @click="submit()">
                <a>Submit</a>
            </div>
        </div>
    </div>
</template>

<script>
    import GlobalField from "../../../handel/functions/field/global.func";

    export default {
        name: "i-form-wizard",
        props: {
            tabs: [Object, Array, Function],
            css: [String, Object, Array],
            id: String,
            stepTitle: false,
            vertical: {
                type: Boolean,
                default: false
            },
            externalSubmit: Function,
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            },
        },
        data() {
          return {
              current: 0
          }
        },
        computed: {
            ...GlobalField.computed(),
            getTabs() {
                return typeof(this.tabs) == 'function' ? this.tabs(this) : this.tabs;
            },
            _style() {
                var $style = this.getStyle('main') || '';
                if (this.vertical) $style += $style === '' ? 'row col-12' : ' row col-12';
                return $style;
            },
            _style_nav() {
                var $style = this.getStyle('nav');
                if (this.vertical) $style = 'flex-column nav-pills ' + ($style === '' ? 'col-md-3' : $style);
                return $style;
            },
            _style_contents() {
                var $style = this.getStyle('contents');
                if (this.vertical) $style = $style === '' ? 'col-md-9' : $style;
                return $style;
            },
            _orientation() {
                return this.vertical ? 'vertical' : 'horizontal';
            }
        },
        methods: {
            ...GlobalField.methods(),
            getStyle(name) {
                if (name === 'main' && typeof (this.css) === 'string') return this.css;
                else if (typeof (this.css) === 'object') return iPath(this.css, name);
                return '';
            },
            _id(name) {
                return this.id + '_' + name;
            },
            _style_nav_item(index) {
                var $style = '';
                if (index === 0) $style = 'first';
                if (index === Object.keys(this.tabs).length - 1) $style = 'last';
                if (index < this.current) $style += ' done';
                if (this.current === index) $style += ' active';
                return $style;
            },
            _style_content(index) {
                var $style = 'body';
                if (index === 0) $style = 'body';
                if (this.current === index) $style += ' active';
                return $style;
            },
        }
    }
</script>
