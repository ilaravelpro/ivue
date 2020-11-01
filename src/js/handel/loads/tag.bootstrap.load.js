import 'bootstrap-tagsinput/src/bootstrap-tagsinput.css';
import "../../../sass/skins/bootstrap-taginput/init.scss";
import 'bootstrap-tagsinput';
Vue.component('i-base-tag', require('../../../views/layouts/fields/base/Tag').default);
Vue.component('i-tag', require('../../../views/layouts/fields/Tag').default);
