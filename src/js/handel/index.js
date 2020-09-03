import './services/system/load.service';
import './services/system/lib.service';
import './services/system/component.service';

window.ApiService = require('./services/system/api.service').default;
window.TokenService = require('./services/system/token.service').default;
