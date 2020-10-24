user = (function () {
    "use strict";
    let form = $('#scheduleTimingFormId');
    let isSubmitted = false;

    function _baseURL() {
        return 'scheduleTiming/';
    }

    function getScheduleDetail() {
        $('#timeSlotTableId tbody').empty();
        let scheduleDate = $('#masterDate').val();
        $.ajax({
            url: "/scheduleTiming/getScheduleDetail",
            type: "GET",
            data: {scheduleDate: scheduleDate},
            success: function (res) {
                if (res.status === 1) {
                    let columnDef = [
                        {data: "scheduleDetailId", class: "scheduleDetailId hidden"},
                        {data: "scheduleMasterId", class: "scheduleMasterId hidden"},
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
                                return '<div class="actions">' +
                                    '<a class="btn btn-sm bg-success-light" id="btnEdit" data-toggle="modal" href="#add_time_slot">' +
                                    '<i class="fe fe-pencil"></i> Edit' +
                                    '</a>' +
                                    '<a data-toggle="modal" href="#delete_modal" id="btnDelete" class="btn btn-sm bg-danger-light">' +
                                    '<i class="fa fa-trash-o"></i> Delete' +
                                    '</a>' +
                                    '</div>';
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

    function btnEdit() {
        $('#timeSlotTableId tbody').on('click', 'tr #btnEdit', function () {
            let row = $(this).closest('tr');
            let selectedRow = row.addClass('selected');
            let scheduleDetailId = selectedRow.find('.scheduleDetailId').text();
            let scheduleMasterId = selectedRow.find('.scheduleMasterId').text();
            let availableFrom = selectedRow.find('.availableFrom').text();
            let availableTo = selectedRow.find('.availableTo').text();
            let scheduleDate = selectedRow.find('.scheduleDate').text();
            selectedRow.removeClass('selected');
            $('#scheduleMasterId').val(scheduleMasterId);
            $('#scheduleDetailId').val(scheduleDetailId);
            $('#availableFrom').val(availableFrom);
            $('#availableTo').val(availableTo);
            $('#scheduleDate').val(scheduleDate);
            $(".modal-title").text(scheduleDate);
            $('#btnSave').text('Update');
        });
    }

    function btnDelete() {
        $('#timeSlotTableId tbody').on('click', 'tr #btnDelete', function () {
            let row = $(this).closest('tr');
            let selectedRow = row.addClass('selected');
            let scheduleDetailId = selectedRow.find('.scheduleDetailId').text();
            selectedRow.removeClass('selected');
            $.ajax({
                url: "/scheduleTiming/deleteScheduleDetail",
                type: "POST",
                data: {scheduleDetailId: scheduleDetailId},
                success: function (res) {
                    if (res.status === 1) {
                        getScheduleDetail();
                    } else {
                        alert(res.text);
                    }
                }
            });
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
                        getScheduleDetail();
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

    $('#masterDate').on('change', function () {
        getScheduleDetail();
    });

    function getCurrentDate() {
        $('#masterDate').val(formatAsDate(new Date()));
    }

    return {
        getCurrentDate: getCurrentDate,
        getScheduleDetail: getScheduleDetail,
        btnEdit: btnEdit,
        btnDelete: btnDelete,
        addSchedule: addSchedule
    }
})();

$(document).ready(function () {
    user.getCurrentDate();
    user.getScheduleDetail();
    user.btnEdit();
    user.btnDelete();
    user.addSchedule();
});
