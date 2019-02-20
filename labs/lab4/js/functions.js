/* global $ */

$(function() {
    $("#zip").on("change", function() {
        $.ajax({
            type: "GET",
            url: "http://itcdland.csumb.edu/~milara/ajax/cityInfoByZip.php",
            dataType: "json",
            data: { "zip": $("#zip").val() },
            success: function(data,status) {
            alert(data.city);
            
            },
            complete: function(data,status) { //optional, used for debugging purposes
            // alert(status);
            }
        
        });//ajax
    });
});