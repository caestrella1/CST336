/* global $ */

var validUser, validPass, suggested;

$(function() {
    suggestPassword();
    $("#password-feedback").hide();
    
    $("#username-json").on("change", function() {
        validateUser("json");
    });
    
    $("#username-text").on("change", function() {
        validateUser("text");
    });
    
    /* Validate password every time field loses focus */
    $("#pass").on("input", validatePassword);
    
    /* Fill in password suggestion ONLY after suggestion is available */
    $(document).on('click','#suggested',function() {
        $("#pass").val(suggested);
    });
    
    $("#submit-btn").on("click", function() {
        // run all the validators (can't return in functions due to AJAX being asynchronous)
        validateUser("json"); validatePassword();
        
        if (validUser && validPass)
            alert("Your account was successfully created!");
    });
    
});

function validateUser(api) {
    let available = "Username is available";
    let unavailable = "Username is not available";
    let error_length = "Username must be at least 4 characters";
    let username = $(`#username-${api}`).val();

    if (api == "json") {
        
        $.ajax({
            type: "GET",
            url: "api/check-username-json.php",
            dataType: "json",
            data: { "username": username },
            success: function(data, status) {
                
                if (username.length < 4) {
                    $("#username-json-feedback").html(error_length);
                    $("#username-json-feedback").addClass("text-danger").removeClass("text-success");
                    validUser = false;
                }
                else if (data.available) {
                    $("#username-json-feedback").html(available);
                    $("#username-json-feedback").addClass("text-success").removeClass("text-danger");
                    validUser = true;
                }
                else {
                    $("#username-json-feedback").html(unavailable);
                    $("#username-json-feedback").addClass("text-danger").removeClass("text-success");
                    validUser = false;
                }
            }
            
        });
        
    }
    else if (api == "text") {
        
        $.ajax({
            type: "GET",
            url: "api/check-username-text.php",
            data: { "username": username },
            success: function(data, status) {
                if (username.length < 4) {
                    $("#username-text-feedback").html(error_length);
                    $("#username-text-feedback").addClass("text-danger").removeClass("text-success");
                    validUser = false;
                }
                else if (data == "true") {
                    $("#username-text-feedback").html(available);
                    $("#username-text-feedback").addClass("text-success").removeClass("text-danger");
                    validUser = true;
                }
                else {
                    $("#username-text-feedback").html(unavailable);
                    $("#username-text-feedback").addClass("text-danger").removeClass("text-success");
                    validUser = false;
                }
            }
        });
        
    }
}

function suggestPassword() {
    $.ajax({
        type: "GET",
        url: "api/suggest-pwd.php",
        data: { "username": $("#username-json").val(), "length": "10" },
        dataType: "json",
        success: function(data, status) {
            suggested = data.suggested;
            $("#pass-suggestion").html(`Suggested Password: <span id="suggested"` 
            +` class="text-success font-weight-bold">${suggested}</span>`);
        }
    });
}

function validatePassword() {
    let error_length = "Password must have at least 6 characters.";
    let error_username = "Password must not contain your username";
    let password = $("#pass").val();
    
    if (password.length < 6) {
        $("#pass-feedback").show();
        $("#pass-feedback").html(error_length);
        validPass = false;
    }
    else {
        $.ajax({
            type: "GET",
            url: "api/validate-pwd.php",
            data: { 
                "username": $("#username-json").val(), 
                "pwd": password
            },
            dataType: "json",
            success: function(data, status) {
                if (data.valid) {
                    $("#pass-feedback").hide();
                    validPass = true;
                }
                else {
                    $("#pass-feedback").show();
                    $("#pass-feedback").html(error_username);
                    validPass = false;
                }
            }
        });
    }
}