/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/12/20, 8:43 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

import './services/system/load.service';
import './services/system/lib.service';
import './services/system/func.service';

window.ApiService = require('./services/system/api.service').default;
window.TokenService = require('./services/system/token.service').default;
