//region === Global Ajax Settings ===
$(document).ajaxSend(function (e, xhr, options) {
    var token = $('input[name="_csrf"]').val();
    xhr.setRequestHeader("X-CSRF-TOKEN", token);
    if (options.type.toUpperCase() === "POST") {
        $.blockUI();
    }
    NProgress.start();
}).ajaxStart(function () {
    NProgress.set(0.4);
}).ajaxStop(function () {
    $.unblockUI();
    NProgress.done();
}).ajaxError(function (event, jgxhr, settings, thrownError) {

    $.unblockUI();
    NProgress.done();

    switch (jgxhr.status) {
        case 500:
            errorMsg("There is an unwanted exception. Please contact with concerned developer.");
            break;
        case 404:
            errorMsg("Invalid Request - 404");
            break;
        case 400:
            errorMsg("Bad Request - 400");
            break;
        case 403:
            errorMsg("Access Denied - 403");
            break;
    }
}).ajaxComplete(function () {
    $.unblockUI();
    NProgress.done();
}).ajaxSuccess(function (event, request, settings) {
    $.unblockUI();
    NProgress.done();
    if (event.redirect) {
        window.location.href = event.redirect;
    }
    var location = request.getResponseHeader('Location');
    if (location && location != window.location.href) {
        window.location.href = location;
    }
});

function errorMsg(msg, callback) {
    swal({
        title: msg,
        text: "Click OK to exit",
        type: "warning"
    }, function (e) {
        if (callback != undefined)
            callback(e);
    });
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function successMsg(msg) {
    swal({
        title: msg,
        text: "Click OK to exit",
        type: "success"
    }, function () {
        //window.location.reload();
    });
}

function warningMsg(msg) {
    swal({
        title: msg,
        text: "Click OK to exit",
        type: "warning"
    }, function () {
        //window.location.reload();
    });
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function formIndexing(tableBody, row, serialNo, iterator) {
    if (!iterator)
        iterator = 0;

    for (var i = 0; i < row.length; i++) {
        tableBody.children().eq(i).children().children().each(
            function () {
                if (this.name) {
                    this.name = this.name.replace(
                        /\[(\d+)\]/, function (str, p) {
                            return '[' + (i + iterator) + ']';
                        });
                }

                if ($(this).hasClass(serialNo)) {
                    $(this).val(i + 1);
                }
            }
        );
    }
}

function indexRowNo(tableId) {
    var childIndex = 0;
    var parentIndex = 0;
    tableId.find('tbody tr').each(function () {
        var row = $(this).closest('tr');
        var selectedRow = row.addClass('selected');
        if (selectedRow.find('.particular').hasClass('particular')) {
            parentIndex = parentIndex + 1;
            selectedRow.find('.parentRowIndex').html(parentIndex);
        } else if (selectedRow.find('.particularDescription').hasClass('particularDescription')) {
            if (selectedRow.prev().find('.particular').hasClass('particular')) {
                childIndex = 0;
            }
            childIndex = childIndex + 1;
            selectedRow.find('.rowNumber').html(parentIndex + '.' + childIndex);
        }
        row.removeClass('selected');
    });
}

function formatAsDate(date) {
    if (date)
        return $.datepicker.formatDate(globalConf.dateFormat(), new Date(date));
    return '';
}

function formatAsShortDate(date) {
    if (date)
        return $.datepicker.formatDate(globalConf.dateFormatShort(), new Date(date));
    return '';
}

function populate(data) {
    for (var i in data) {
        if (typeof (data[i]) === 'object') {
            //populate(data[i]);
        } else {
            if (typeof data[i] == "string") {
                var newData = data[i].replace("'", "\'");
            } else {
                newData = data[i];
            }
            //var data=data[i].replace('\'', '\\\'');
            $(
                "input[type='text'][name='" + i + "']," +
                "input[type='hidden'][name='" + i + "'], " +
                "input[type='checkbox'][name='" + i + "'], " +
                "input[type='email'][name='" + i + "'], " +
                "select[name='" + i + "'], textarea[name='" + i + "']"
            ).val(newData);

            if (typeof data[i] !== "string") {
                $("input[type='radio'][name='" + i + "'][value='" + newData + "']").prop('checked', true);

            }
            if ($("input[name='" + i + "']").hasClass('datepicker')) {
                $("input[name='" + i + "']").val($.datepicker.formatDate("dd-M-yy", new Date(newData)));
            }
        }
    }

    $('form').find('input[type="checkbox"]').each(
        function () {
            if ($(this).siblings('input[type="hidden"]').val() == "true" ||
                $(this).siblings('input[type="hidden"]').val() == 1) {
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        }
    );
}

function allowKeys(e) {
    //Allow: backspace, delete, tab, escape, enter
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            //Allow: Ctr+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
            //Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        return true;
    }
    return false;
}

function parseEntryAsDate(id) {
    id = '#' + id;
    var val = $(id).val();
    val = val.trim();
    if (val) {
        var date = null;
        if (val.length > 8) {
            date = $.datepicker.parseDate(globalConf.dateFormat(), val);
            if (date.getTime()) {
                val = $.datepicker.formatDate(globalConf.dateFormat(), new Date(date));
                $(id).val(val);
                return true;
            }
        }
        date = parseAsDate(val);
        if (!date) {
            $(id).val('');
            return;
        }
        $(id).datepicker("setDate", date);
        val = $.datepicker.formatDate(globalConf.dateFormat(), date);
        $(id).val(val);
        return true;
    }
}

function parseAsDate(val) {
    if (val) {
        var dateRegex = /((3[01])|([012]\d)|[1-9])((1[012])|(0?[1-9]))?((19|20)?\d\d?)?/;
        var dateMatch = val.match(dateRegex);
        if (!dateMatch || !dateMatch[1]) {
            return;
        }
        var day = dateMatch[1];
        var date = new Date();
        //if (currentUser.systemOpenDate) {
        //    date = new Date(currentUser.systemOpenDate);
        //}
        var month = date.getMonth();
        var year = date.getFullYear();
        if (dateMatch[4]) {
            month = dateMatch[4];
        }
        if (dateMatch[7]) {
            year = dateMatch[7];
            year = parseInt(year);
            if (dateMatch[7].length < 3) {
                if (year > 70)
                    year = 1900 + year;
                else
                    year = 2000 + year;
            }
        }
        date = new Date(year, month - 1, day);
        return date;

    }
}

ttplGlobal = (function () {
    "use strict";

    function baseUrl() {
        ////TODO for production environment
        //return window.location.protocol + '//' + window.location.host + '/lis/';
        return window.location.protocol + '//' + window.location.host + '/';
    }

    function baseReportLocation() {
        //TODO for production environment
        //return window.location.protocol + '//' + window.location.host + '/lis/resources/reports/';
        return window.location.protocol + '//' + window.location.host + '/resources/reports/';
    }

    function ajax(url, type, data, callback) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: callback
        });
    }

    function ajax_with_attachment(url, type, data, callback) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            enctype: 'multipart/form-data',
            contentType: false,
            processData: false,
            success: callback
        });
    }

    //to add row to the grid
    function addRow(tableBody, row) {

        var lastRow = tableBody.children('tr:last');

        var firstRowClone = $('tr:first-child', tableBody).clone(false);
        lastRow.before(firstRowClone);

        firstRowClone.find('input[type="text"]').val('');
        if (firstRowClone.find('.datepicker').hasClass('hasDatepicker')) {

            firstRowClone.find('.datepicker').attr('id', '')
                .removeClass('hasDatepicker').datepicker({
                    dateFormat: globalConf.dateFormat(),
                    changeMonth: true,
                    changeYear: true,
                    yearRange: 'c-65:c+10',
                    beforeShow: function (input, inst) {
                        if ($(input).prop("readonly")) {
                            return false;
                        }
                    }
                });
        }
        formIndexing(tableBody, row);
    }

    function loadDropDown(element, data, type) {
        element.empty();
        if (!data) {
            data = [];
        }
        if (data.length) {
            element.append(
                $(
                    '<option/>', {
                        value: "",
                        text: "-- Please Select --"
                    }
                )
            );
            if (type === 'char') {
                $.each(
                    data, function (index, itemData) {
                        element.append(
                            $(
                                '<option/>', {
                                    value: itemData.valueChar,
                                    text: itemData.text
                                }
                            )
                        );
                    }
                );
            }


            if (type === 'string') {
                $.each(
                    data, function (index, itemData) {
                        element.append(
                            $(
                                '<option/>', {
                                    value: itemData.value,
                                    text: itemData.text
                                }
                            )
                        );
                    }
                );
            }

            if (type === 'integer') {
                $.each(
                    data, function (index, itemData) {
                        if (itemData.text != null) {
                            element.append(
                                $(
                                    '<option/>', {
                                        value: itemData.valueInteger,
                                        text: itemData.text
                                    }
                                )
                            );
                        }
                    }
                );
            }
            if (type === 'integer') {
                $.each(
                    data, function (index, itemData) {
                        if (itemData.valueText != null) {
                            element.append(
                                $(
                                    '<option/>', {
                                        value: itemData.valueInteger,
                                        text: itemData.valueText
                                    }
                                )
                            );
                        }
                    }
                );
            }
            if (type === 'bigInteger') {
                $.each(
                    data, function (index, itemData) {
                        element.append(
                            $(
                                '<option/>', {
                                    value: itemData.valueBigInteger,
                                    text: itemData.text
                                }
                            )
                        );
                    }
                );
            }

            if (type === 'short') {
                $.each(
                    data, function (index, itemData) {
                        element.append(
                            $(
                                '<option/>', {
                                    value: itemData.valueShort,
                                    text: itemData.text
                                }
                            )
                        );
                    }
                );
            }

            if (type === 'valueInteger') {
                $.each(
                    data, function (index, itemData) {
                        element.append(
                            $(
                                '<option/>', {
                                    value: itemData.valueInteger,
                                    text: itemData.text
                                }
                            )
                        );
                    }
                );
            }
        }
    }

    function calculateSystemScore(target, achievement, weight, formulaType) {

        if (target == '' || weight == '' || achievement == '') {
            return '';
        }
        var score = 0;
        var baseline;
        target = parseFloat(target);
        weight = parseFloat(weight);
        achievement = parseFloat(achievement);

        if (formulaType == 1) {
            if (achievement <= 0) {
                score = 0;
            } else {
                baseline = (0.75 * target); //(75/100)
                if (achievement >= target) {
                    score = weight;
                } else {
                    score = achievement < baseline ? 0.00 : (achievement - baseline) / (target - baseline) * weight;
                }
            }
        } else if (formulaType == 2) {
            baseline = (1.05 * target); //(105/100)
            if (achievement > baseline) {
                score = 0.00;
            } else if (achievement < target) {
                score = weight;
            } else {
                score = (baseline - achievement) / (baseline - target) * weight;
            }
        }
        return score.toFixed(2);
    }

    function isFormValid(form) {
        form.validate({
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.col-sm-10').append(error);
            }, highlight: function (element) {
                $(element).addClass('is-invalid');
            }, unhighlight: function (element) {
                $(element).removeClass('is-invalid');
            }
        });
    }

    //<editor-fold desc="to close modal on pressing Escape key">
    $(document).on('keydown', function (event) {
        if (event.key == "Escape") {
            $('.fade').modal('hide');
        }
    });
    //</editor-fold>

    return {
        baseUrl: baseUrl,
        ajax: ajax,
        ajax_with_attachment: ajax_with_attachment,
        formIndexing: formIndexing,
        baseReportLocation: baseReportLocation,
        addRow: addRow,
        loadDropDown: loadDropDown,
        calculateSystemScore: calculateSystemScore,
        isFormValid: isFormValid
    };
})();

//*********************************************************************************************************

//region *** Document Ready Method ***
$(document).ready(function () {
        //Local variable for show errors on pop instead of tooltip
        var body = $('body');

        //<editor-fold desc="to show title on hover">
        $('textarea, input').hover(function () {
            $(this).attr('title', $(this).val());
        });

        $('table').on('mouseover', 'tbody tr', function (e) {
            var currentCell = $(e.target).closest("td");
            currentCell.find('textarea').attr('title', currentCell.find('textarea').val());
            currentCell.find('input').attr('title', currentCell.find('input').val());
        });
        //</editor-fold>
        //region *** Restriction Event ***
        body.on('keypress', '.alphanumeric', function (e) {
                if (allowKeys(e)) {
                    return true;
                }
                var regex = new RegExp("^[a-zA-Z0-9]+$");
                var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                if (regex.test(str)) {
                    return true;
                }

                e.preventDefault();
                return false;
            }
        );

        /**
         * to allow only numeric characters
         * it allow to copy and paste number only characters only
         */
        body.on('keypress keyup blur', '.numeric', function (e) {
                $(this).val($(this).val().replace(/[^\d].+/, ""));
                if ((e.which < 48) || e.which > 57) {
                    e.preventDefault();
                }
            }
        );

        /**
         * to allow only decimal numbers
         */
        body.on('keypress keyup blur', '.decimal', function (e) {
                $(this).val($(this).val().replace(/[0-9\.]/g, ''));
                if ((e.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
                    e.preventDefault();
                }
            }
        );

        body.on('keypress', '.phone', function (e) {
                var evt = (e) ? e : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                    return false;
                }
                return true;
            }
        );


        function isAmount(event, element) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if ((charCode != 46 || $(element).val().indexOf('.') != -1) && charCode != 45 && charCode != 46 && !(charCode >= 48 && charCode <= 57)) {
                return false;
            }
            //if (
            //    (charCode != 46 || $(element).val().indexOf('.') != -1) &&
            //    (charCode != 9) &&
            //    (charCode < 48 || charCode > 57) &&
            //    (charCode != 8))
            //    return false;
            else
                return true;
        }

        body.on('keypress', '.amount', function (e) {
                return isAmount(e, this);
            }
        );

        body.on('keydown', '.percentage', function (e) {
                if (allowKeys(e)) {
                    return;
                }

                if ((e.which >= 96 && e.which <= 105) || (e.which >= 48 && e.which <= 57) || e.which === 190 ||
                    e.which === 110) {

                } else {
                    e.preventDefault();
                }
            }
        );

        body.on('blur', '.percentage', function (e) {
                var $this = $(this);
                if ($this.val()) {
                    var value = $this.val();

                    var regex = new RegExp("^[0-9]{1,3}(\\.([0-9]{1,2})?)?$");
                    if (!regex.test(value)) {
                        warningMsg('Incorrect Format. Format is ###.##');
                        $this.val('');
                        return;
                    }
                }
                if (value > 100) {
                    warningMsg('Please insert interest rate between zero(0) and hundred(100)');
                    $this.val('');
                    return;
                }
            }
        );

        var datePickerOptions = {
            dateFormat: globalConf.dateFormat(),
            changeMonth: true,
            changeYear: true,
            yearRange: 'c-65:c+10',
            beforeShow: function (input, inst) {
                if ($(input).prop("readonly")) {
                    return false;
                }
            }
        };

        $(".datepicker").datepicker(datePickerOptions);

        $('body').on('focus', '.datepicker', function () {
            if ($(this).hasClass('dynamic')) {
                $(this).datepicker(datePickerOptions);
            }
        });

        body.on('keydown', 'input ,a , select', function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13 || key == 9 & e.target.type != 'submit' & $(e.target).hasClass('datepicker')) {
                var id = $(e.target).attr('id');
                parseEntryAsDate(id);
            }
            if (key == 13 & e.target.type != 'submit') {
                e.preventDefault();

                if (e.target.tagName.toLocaleLowerCase() === 'a' || e.target.type === 'button') {
                    $(this).click();
                }

                var manualNextIndex = $(this).attr("data-nextIndex");
                if (manualNextIndex) {
                    var $manualNext = $('[tabindex=' + manualNextIndex + ']');
                    $manualNext.focus();
                    return false;
                }

                var curIndex = this.tabIndex;
                var i = +curIndex + 1;
                var $next = null;
                var allNext = $('[tabindex=' + i + ']:not(body):not([readonly]):not(:disabled)');
                if (allNext.length) {
                    $next = allNext[0];
                }
                if (!$next) {
                    var nextPossibleTabIndex = 10000;
                    allNext = $('[tabindex]:not(body):not([readonly]):not(:disabled)').filter(function (ix, el) {
                        var tb = el.tabIndex;
                        if (+tb > +curIndex) {
                            nextPossibleTabIndex = nextPossibleTabIndex > +tb ? +tb : nextPossibleTabIndex;
                            return true;
                        } else {
                            return false;
                        }
                    });
                    if (allNext.length) {
                        $next = $('[tabindex=' + nextPossibleTabIndex + ']');
                    }
                }

                if (!$next) {
                    $next = $('[tabindex]:not(body):not([readonly]):not(:disabled)')[0];
                }
                if ($next.attr('type') == 'reset') {
                    $('input[type="submit"]').focus();
                } else {
                    $($next).focus();
                }
            }
        });
    }
);
//endregion *** Document Ready Method ***

//Resizing table column
$(function () {
    var pressed = false;
    var start = undefined;
    var startX, startWidth;

    $("table th").mousedown(function (e) {
        start = $(this);
        pressed = true;
        startX = e.pageX;
        startWidth = $(this).width();
        $(start).addClass("resizing");
    });

    $(document).mousemove(function (e) {
        if (pressed) {
            $(start).width(startWidth + (e.pageX - startX));
        }
    });
    $(document).mouseup(function () {
        if (pressed) {
            $(start).removeClass("resizing");
            pressed = false;
        }
    });
});