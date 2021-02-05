/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 11/2/20, 4:36 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

import 'bootstrap-tagsinput/src/bootstrap-tagsinput.css';
import "../../../sass/skins/bootstrap-taginput/init.scss";
import 'bootstrap-tagsinput';
Vue.component('i-base-tag', require('../../../js/views/layouts/fields/base/Tag').default);
Vue.component('i-tag', require('../../../js/views/layouts/fields/Tag').default);
