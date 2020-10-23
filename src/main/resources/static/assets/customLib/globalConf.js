globalConf = (function () {
    "use strict";

    function dateFormat() {
        return "dd-M-yy";
    }
    function dateFormatShort() {
        return "dd-mm-yy";
    }

    return {
        dateFormat: dateFormat,
        dateFormatShort: dateFormatShort
    };
})();

$(document).ready(function () {
    globalConf.dateFormat();
    globalConf.dateFormatShort();
});