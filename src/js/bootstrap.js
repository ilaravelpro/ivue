window._ = require('lodash');
window.Vue = require('vue');
window.Vuex = require('vuex');
try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');
    require('bootstrap').default;
} catch (e) {
    console.log(e)
}
window.purify = o => JSON.parse(JSON.stringify(o))
Vue.prototype.$eventHub = new Vue();

import 'bootstrap-notify';

moment.updateLocale(window.app_locale, {
    week: {
        dow: 1
    }
})
