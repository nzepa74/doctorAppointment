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
            data: {scheduleDate: '24-Oct-2020'},
            success: function (res) {
                if (res.status === 1) {
                    let columnDef = [
                        {data: "scheduleDetailId", class: "scheduleDetailId hidden"},
                        {
                            class: "align-middle", "mRender": function (data, type, row, meta) {
                                return meta.row + 1;
                            }
                        },
                        {
                            data: "appointmentStatus",
                            render: function (data) {
                                let status = null;
                                if (data === 'A') {
                                    status = '<i class="status-icon bg-blue spinner-grow"></i>' + "Approved";
                                }
                                return status;
                            }
                        },
                        {data: 'availableFrom', class: "availableFrom align-middle"},
                        {data: 'availableTo', class: "availableTo align-middle"},
                        {data: "scheduleDate", class: "scheduleDate align-middle"},
                        {
                            "data": "null", class: "align-middle",
                            "mRender": function () {
                                return '<a href="#" id="btnView" class="btn btn-primary btn-sm ml-3 d-none d-sm-inline-block" data-toggle="modal" data-target="#add_time_slot">View</a>';
                            }
                        }
                    ];
                    $('#timeSlotTableId').DataTable({
                        data: res.dto
                        , columns: columnDef
                        , destroy: true
                        , bSort: false
                        , searching: false
                        , info: false
                        , paging: false
                    });
                } else {
                    alert(res.text);
                }
            }
        });
    }

    function btnView() {
        $('#timeSlotTableId tbody').on('click', 'tr #btnView', function () {
            let row = $(this).closest('tr');
            let selectedRow = row.addClass('selected');
            let scheduleDetailId = selectedRow.find('.scheduleDetailId').text();
            let availableFrom = selectedRow.find('.availableFrom').text();
            let availableTo = selectedRow.find('.availableTo').text();
            let scheduleDate = selectedRow.find('.scheduleDate').text();
            selectedRow.removeClass('selected');
            $('#scheduleDetailId').val(scheduleDetailId);
            $('#availableFrom').val(availableFrom);
            $('#availableTo').val(availableTo);
            $('#scheduleDate').val(scheduleDate);
            $(".modal-title").text(scheduleDate);
            $('#btnSave').text('Update');
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
        $('#btnSave').text('Save');
        $('.field').val('');
    });

    return {
        getScheduleDetail: getScheduleDetail,
        btnView: btnView,
        addSchedule: addSchedule
    }
})();

$(document).ready(function () {
    user.getScheduleDetail();
    user.btnView();
    user.addSchedule();
});
