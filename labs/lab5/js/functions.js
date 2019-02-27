/* global $ */

var validZip, validUser, validPass, validConfirm;

$(function() {
    $("#zip-error").hide();
    $("#password-feedback").hide();
    
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
            }
        });
    });
    
    $("#zip").on("change", validateZip);
    $("#username").on("change", validateUser);
    $("#pass").on("change", validatePassword);
    $("#pass-confirm").on("change", confirmPassword);
    
    $("#submit-btn").on("click", function() {
        // run all the validators (can't return in functions due to AJAX being asynchronous)
        validateZip(); validateUser(); validatePassword(); confirmPassword();
        
        // hold all results in an array to make sure result doesn't short circuit
        if ([validZip, validUser, validPass, validConfirm].every(Boolean))
            alert("Your account was successfully created!");
    });
    
});

function validateZip() {
    $.ajax({
        type: "GET",
        url: "http://itcdland.csumb.edu/~milara/ajax/cityInfoByZip.php",
        dataType: "json",
        data: { "zip": $("#zip").val() },
        success: function(data, status) {
            if (typeof data["zip"] === "undefined") {
                $("#zip-error").show();
                $("#city").html("");
                $("#lat").html("");
                $("#long").html("");
                validZip = false;
            }
            else {
                $("#zip-error").hide();
                $("#city").html(data.city);
                $("#lat").html(data.latitude);
                $("#long").html(data.longitude);
                validZip = true;
            }
        },
        error: function() {
            $("#zip-error").show();
            validZip = false;
        }
    });
}

function validateUser() {
    let available = "Username is available";
    let unavailable = "Username is not available";
    let userlength = "Username must be at least 4 characters";
    let username = $("#username").val();
    
    /* Using JSON */
    $.ajax({
        type: "GET",
        url: "check-username-json.php",
        dataType: "json",
        data: { "username": username },
        success: function(data, status) {
            if (username.length < 4) {
                $("#username-feedback").html(userlength);
                $("#username-feedback").addClass("text-danger").removeClass("text-success");
                validUser = false;
            }
            else if (data.available) {
                $("#username-feedback").html(available);
                $("#username-feedback").addClass("text-success").removeClass("text-danger");
                validUser = true;
            }
            else {
                $("#username-feedback").html(unavailable);
                $("#username-feedback").addClass("text-danger").removeClass("text-success");
                validUser = false;
            }
        }
    });
    
    /* Using PHP */
    // $.ajax({
    //     type: "GET",
    //     url: "check-username.php",
    //     data: { "username": username },
    //     success: function(data, status) {
    //         if (username.length < 4) {
    //             $("#username-feedback").html(userlength);
    //             $("#username-feedback").addClass("text-danger").removeClass("text-success");
    //             validUser = false;
    //         }
    //         else if (data == "true") {
    //             $("#username-feedback").html(available);
    //             $("#username-feedback").addClass("text-success").removeClass("text-danger");
    //             validUser = true;
    //         }
    //         else {
    //             $("#username-feedback").html(unavailable);
    //             $("#username-feedback").addClass("text-danger").removeClass("text-success");
    //             validUser = false;
    //         }
    //     }
    // });
}

function validatePassword() {
    let req = "Password must have at least 6 characters.";
    let password = $("#pass").val();
    
    if (password.length < 6) {
        $("#pass-feedback").show();
        $("#pass-feedback").html(req);
        validPass = false;
    }
    else {
        $("#pass-feedback").hide();
        validPass = true;
    }
}

function confirmPassword() {
    let mismatch = "Passwords do not match.";
    let password = $("#pass").val();
    let confirm = $("#pass-confirm").val();
    
    if (password != confirm) {
        $("#pass-confirm-feedback").show();
        $("#pass-confirm-feedback").html(mismatch);
        validConfirm = false;
    }
    else {
        $("#pass-confirm-feedback").hide();
        validConfirm = true;
    }
}