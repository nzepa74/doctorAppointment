user = (function () {
    "use strict";
    let form = $('#scheduleTimingFormId');
    let isSubmitted = false;

    function _baseURL() {
        return 'scheduleTiming/';
    }

    function addSchedule() {
        $('#btnSave').on('click', function () {
            $.ajax({
                url: "/scheduleTiming/addSchedule",
                type: "POST",
                data: $("#scheduleTimingFormId").serializeJSON(),
                contentType: "application/json; charset=UTF-8",
                success: function (res) {
                    if (res.status === 1) {
                        $('#add_time_slot').modal('hide');
                         $(".field").val('');
                    } else {
                        alert(res.text);
                    }
                }
            });
        });
    }

    $('#btnAddSlot').on('click', function () {
        let masterDate = $("#masterDate").val();
        $("#scheduleDate").val(masterDate);
        $(".modal-title").text(masterDate);
    });

    return {
        addSchedule: addSchedule
    }
})();

$(document).ready(function () {
    user.addSchedule();
});
