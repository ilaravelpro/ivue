window._ = require('lodash');
window.Vue = require('vue');
window.Vuex = require('vuex');
import fs from "fs";
try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');
    window.fs = fs;
    require('bootstrap').default;
} catch (e) {}
window.purify = o => JSON.parse(JSON.stringify(o))
Vue.prototype.$eventHub = new Vue();

import 'bootstrap-notify';

moment.updateLocale(window.app_locale, {
    week: {
        dow: 1
    }
})
