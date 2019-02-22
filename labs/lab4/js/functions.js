/* global $ */

$(function() {
    $("#zip-error").hide();
    
    $("#state").on("change", function() {
        $.ajax({
            type: "GET",
            url: "http://itcdland.csumb.edu/~milara/ajax/countyList.php",
            dataType: "json",
            data: { "state": $("#state").val() },
            success: function(data,status) {
                $("#county").html("Select one");
                for (let i = 0; i < data.length; i++) {
                    $("#county").append("<option>" + data[i].county + "</option>")
                }
            },
            complete: function(data,status) { //optional, used for debugging purposes
            // alert(status);
            }
        
        });//ajax
    });
    
    $("#zip").on("change", function() {
        $.ajax({
            type: "GET",
            url: "http://itcdland.csumb.edu/~milara/ajax/cityInfoByZip.php",
            dataType: "json",
            data: { "zip": $("#zip").val() },
            success: function(data,status) {
                if (typeof data["zip"] === "undefined") {
                    $("#zip-error").show();
                    $("#city").html("");
                    $("#lat").html("");
                    $("#long").html("");
                }
                else {
                    $("#zip-error").hide();
                    $("#city").html(data.city);
                    $("#lat").html(data.latitude);
                    $("#long").html(data.longitude);
                }
            },
            error: function() {
                $("#zip-error").show();
            },
            complete: function(data,status) { //optional, used for debugging purposes
            // alert(status);
            }
        
        });//ajax
    });
    
    $("#username").on("change", function() {
       $.ajax({
            type: "GET",
            url: "http://myspace.csumb.edu/~milara/ajax/username/usernameLookup.php",
            dataType: "json",
            data: { "username": $("#username").val() },
            success: function(data,status) {
                // alert(data.username);
                if (data.available == "true") {
                    $("#username-feedback").html("Username is available");
                    $("#username-feedback").addClass("text-success").removeClass("text-danger");
                    // alert("available");
                }
                else {
                    $("#username-feedback").html("Username is not available");
                    $("#username-feedback").addClass("text-danger").removeClass("text-success");
                }
            },
            error: function(data, status) {
                
            },
            complete: function(data,status) { //optional, used for debugging purposes
            
            }
       });
    });
});