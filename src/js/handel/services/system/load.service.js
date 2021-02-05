/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 9/11/20, 5:24 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

$(document).on('focus', 'input[type=number]', function (e) {
    $(this).on('wheel.disableScroll', function (e) {
        e.preventDefault()
    })
})
$(document).on('blur', 'input[type=number]', function (e) {
    $(this).off('wheel.disableScroll')
})
console.log(
    `%c iVue %c Powered By iAmir.net %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:transparent'
)
