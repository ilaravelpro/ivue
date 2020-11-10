import 'bootstrap-datetime-picker';
import 'bootstrap-datepicker';
import 'bootstrap-datetime-picker/css/bootstrap-datetimepicker.css';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.css';
$(document).ready(function () {
    $('[data-toggle="datetimepicker"] input').datetimepicker({
        todayHighlight: !0,
        autoclose: !0,
        pickerPosition: "bottom-right",
        todayBtn: !0,
        format:  "yyyy/mm/dd hh:ii"
    })
    $('[data-toggle="datepicker"] input').datepicker({
        format: "yyyy/mm/dd",
        todayBtn: "linked",
        orientation: "bottom right",
        autoclose: true,
        todayHighlight: true
    })
})
