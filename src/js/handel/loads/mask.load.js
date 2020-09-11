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
