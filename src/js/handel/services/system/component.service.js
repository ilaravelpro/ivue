window.Vue = require('vue');

Vue.component('i-datatable-list', require('../../../views/layouts/datatable/List').default);

Vue.component('i-page-create', require('../../../views/layouts/pages/Create').default);
Vue.component('i-repeater-base', require('../../../views/layouts/repeaters/Base').default);
Vue.component('i-repeater-accordion', require('../../../views/layouts/repeaters/Accordion').default);

Vue.component('i-modal', require('../../../views/layouts/tools/Modal').default);
Vue.component('i-form', require('../../../views/layouts/forms/Form').default);
Vue.component('i-form-fields', require('../../../views/layouts/forms/FormFields').default);
Vue.component('i-form-tabs', require('../../../views/layouts/forms/FormTabs').default);
Vue.component('i-form-wizard', require('../../../views/layouts/forms/FormWizard').default);

Vue.component('i-base', require('../../../views/layouts/fields/Base').default);
Vue.component('i-multi', require('../../../views/layouts/fields/Multi').default);
Vue.component('i-base-input', require('../../../views/layouts/fields/base/Input').default);
Vue.component('i-base-text-area', require('../../../views/layouts/fields/base/TextArea').default);
Vue.component('i-base-file', require('../../../views/layouts/fields/base/File').default);
Vue.component('i-base-select', require('../../../views/layouts/fields/base/Select').default);
Vue.component('i-base-autocomplete', require('../../../views/layouts/fields/base/AutoComplete').default);
Vue.component('i-base-phone', require('../../../views/layouts/fields/base/Phone').default);
Vue.component('i-base-checkbox', require('../../../views/layouts/fields/base/Checkbox').default);
Vue.component('i-input', require('../../../views/layouts/fields/Input').default);
Vue.component('i-text-area', require('../../../views/layouts/fields/TextArea').default);
Vue.component('i-file', require('../../../views/layouts/fields/File').default);
Vue.component('i-checkbox', require('../../../views/layouts/fields/Checkbox').default);
Vue.component('i-radio', require('../../../views/layouts/fields/Radio').default);
Vue.component('i-select', require('../../../views/layouts/fields/Select').default);
Vue.component('i-autocomplete', require('../../../views/layouts/fields/AutoComplete').default);
Vue.component('i-phone', require('../../../views/layouts/fields/Phone').default);
Vue.component('i-checkbox', require('../../../views/layouts/fields/Checkbox').default);
Vue.component('i-label-checkbox', require('../../../views/layouts/fields/LabelCheckbox').default);
