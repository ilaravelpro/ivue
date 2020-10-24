<template>
    <div :class="_style">
        <ul class="nav" :class="_style_nav" role="tablist"
            :aria-orientation="_orientation">
            <li v-for="(tab, index) in Object.values(getTabs)" class="nav-item">
                <a class="nav-link" :class="index === 0 ? 'active' :''" :id="`${_id(tab.name)}_tab`" data-toggle="tab"
                   :href="`#${_id(tab.name)}`" role="tab" :aria-controls="_id(tab.name)" aria-selected="true">{{
                    tab.title }}</a>
            </li>
        </ul>
        <div class="tab-content" :class="_style_contents">
            <div v-for="(tab, index) in  Object.values(getTabs)" class="tab-pane fade show p-2" :class="index === 0 ? 'active ' :''"
                 :id="_id(tab.name)" role="tabpanel" :aria-labelledby="`${_id(tab.name)}_tab`">
                <button v-if="isBtnView(tab)" class="btn btn-warning" @click="setView(tab)">Load Tab</button>
                <slot v-if="$scopedSlots[`tab.${tab.name}`]" :name="`tab.${tab.name}`" v-bind:tab="tab" v-bind:namespace="storeNamespace"></slot>
                <slot v-else-if="$scopedSlots[`tab_body`]" name="tab_body" v-bind:tab="tab" v-bind:namespace="storeNamespace"></slot>
                <template v-else-if="tab.items" v-for="item in tab.items" v-if="isView(tab)">
                    <component :is="item.component" v-bind="item.attrs" v-if="item.if ? item.if() : true" :storeNamespace="storeNamespace"/>
                </template>
            </div>

        </div>
    </div>
</template>

<script>
    import GlobalField from "../../../handel/functions/field/global.func";

    export default {
        name: "i-form-tabs",
        props: {
            tabs: [Object, Array, Function],
            css: [String, Object, Array],
            id: String,
            vertical: {
                type: Boolean,
                default: false
            },
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            },
            btnView: Boolean
        },
        data() {
          return {
              viewComp: {}
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
                else $style = 'nav-tabs';
                return $style;
            },
            _style_contents() {
                var $style = this.getStyle('contents');
                if (this.vertical) $style = $style === '' ? 'col-md-9' : $style;
                return $style;
            },
            _orientation() {
                return this.vertical ? 'vertical' : 'horizontal';
            },
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
            isBtnView(tab) {
                return this.btnView || tab.btnView;
            },
            isView(tab) {
                return this.isBtnView(tab) ? this.viewComp[tab.name] : true;
            },
            setView(tab) {
                this.viewComp[tab.name] = !this.viewComp[tab.name];
                this.$forceUpdate()
            },
        }
    }
</script>
