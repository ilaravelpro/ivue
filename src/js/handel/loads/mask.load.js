/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/10/20, 10:56 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

import inputmask from "inputmask/dist/jquery.inputmask";
Vue.directive('mask', {
    bind:function (el, binding) {
        if (iPath.get(binding.value, 'numeric')){
            $(el).inputmask('numeric', binding.value.numeric);
        }
        else
            $(el).inputmask(binding.value ? binding.value : '');
    }
})
