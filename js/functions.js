/*global $*/ 

$(function() {
    $("#hello").on("click", function() {
        $("body").toggleClass("light-bg darker-bg");
        $(".entry").toggleClass("lighter-bg dark-bg");
    });
});