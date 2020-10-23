$(document).ready(function () {
    if (document.URL.search("/register") > 1)
        scriptLoader("assets/customLib/js/scheduleTiming.js");
});

let scriptLoader = function (url) {
     $.ajax(
        {
            type: "GET",
            url: url,
            dataType: "script",
            cache: false
        });
};



