window._ = require('lodash');
window.Vue = require('vue');
window.Vuex = require('vuex');

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
} catch (e) {}

window.purify = o => JSON.parse(JSON.stringify(o))

Vue.prototype.$eventHub = new Vue();

import { abilitiesPlugin } from '@casl/vue'
import ability from './handel/config/ability'
Vue.use(abilitiesPlugin, ability)
window.ability = ability;

moment.updateLocale(window.app_locale, {
    week: {
        dow: 1
    }
})

