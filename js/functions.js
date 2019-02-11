/*global $*/ 

function toggleColor() {
    $("#container").toggleClass("light-bg dark-bg");
    $("#content").toggleClass("lighter-bg darker-bg");
}

$("#hello").on("click", toggleColor);