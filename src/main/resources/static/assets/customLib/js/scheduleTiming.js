user = (function () {
    "use strict";
    let form = $('#scheduleTimingFormId');
    let isSubmitted = false;

    function _baseURL() {
        return 'scheduleTiming/';
    }

    function getScheduleDetail() {
        let scheduleDate = $('#scheduleDate').val();
        $.ajax({
            url: "/scheduleTiming/getScheduleDetail",
            type: "GET",
            data: {scheduleDate: '23-Oct-2020'},
            success: function (res) {
                if (res.status === 1) {
                    let columnDef = [
                        {
                            class: "align-middle", "mRender": function (data, type, row, meta) {
                                return meta.row + 1;
                            }
                        },
                        {
                            data: {
                                scheduleDetailId: "scheduleDetailId",
                                appointmentStatus: "appointmentStatus"
                            },
                            render: function (data) {
                                let status = null;
                                if (data.scheduleDetailId === 'A') {
                                    status = '<input type="hidden" id="appointmentStatus" class="appointmentStatus" value="' + data.appointmentStatus + '">' +
                                        '<i class="status-icon bg-blue spinner-grow"></i>' + "Approved";
                                }
                                return status;
                            }
                        },
                        {data: 'availableFrom', class: "align-middle"},
                        {data: 'availableTo', class: "align-middle"},
                        {
                            "data": "scheduleDate", class: "align-middle",
                            "mRender": function (data) {
                                return formatAsDate(data);
                            }
                        },
                        {
                            "data": "null", class: "align-middle",
                            "mRender": function () {
                                return '<a href="#" id="btnViewApplication" class="btn btn-primary btn-sm ml-3 d-none d-sm-inline-block" data-toggle="modal" data-target="#applicationDetailModal">View</a>';
                            }
                        }
                    ];
                    $('#timeSlotTableId').DataTable({
                        data: res.dto
                        , columns: columnDef
                        , destroy: true
                        , bSort: false
                    });
                } else {
                    alert(res.text);
                }
            }
        });
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
        getScheduleDetail: getScheduleDetail,
        addSchedule: addSchedule
    }
})();

$(document).ready(function () {
    user.getScheduleDetail();
    user.addSchedule();
});
