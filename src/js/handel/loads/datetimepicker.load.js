import 'bootstrap-datetime-picker';
import 'bootstrap-datetime-picker/css/bootstrap-datetimepicker.css';
$(function () {
    $('[data-toggle="datetimepicker"] input').datetimepicker({
        todayHighlight: !0,
        autoclose: !0,
        pickerPosition: "bottom-right",
        todayBtn: !0,
        format: "yyyy/mm/dd hh:ii"
    })
})
