import './services/system/load.service';
import './services/system/lib.service';
import './services/system/func.service';

window.ApiService = require('./services/system/api.service').default;
window.TokenService = require('./services/system/token.service').default;
