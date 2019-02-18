/* global $ */
var points = 20;
var q1ans = "Sacramento";
var q2ans = "Missouri River";
var q3ans = "Rhode Island";
var q5ans = "seal2";

/* LocalStorage can only store strings/ints, need to parse/format array */
var scores = JSON.parse(localStorage.getItem("previousScores"));
if (!scores) scores = [];
var reset = false; // resuse submit button for resetting questions

$("#quiz-count").html(displayCount());
$("#score-history").html(displayScores());

// HEX values for text colors
var correct = "#189E35";
var incorrect = "#FF3B2F";

$(".img-choice").on("click", function() {
    $(".img-choice").removeClass("selected");
    $(this).addClass("selected");
});

$("#submitbtn").on("click", function() {
    if (reset) {
        tryAgain();
        return;
    }
    
    if (!isFormValid()) {
        alert("Please answer all the questions.");
        return;
    }
    
    let score = 0; // initialize score
    
    // Get user responses
    let q1response = $("#q1").val();
    let q2response = $("#q2").val();
    let q3response = $("input[name='states']:checked").val();
    let q5response = $(".selected").attr("id");
    
    $(".feedback").show();
   
    if (q1response.toLowerCase() == q1ans.toLowerCase()) {
        score += points;
        $("#q1-feedback").css("color", correct);
        $("#q1-feedback").html("Correct!");
    }
    else {
        $("#q1-feedback").css("color", incorrect);
        $("#q1-feedback").html("Wrong!");
    }
    
    // Check if response value is NULL (ie user didn't respond to question)
    if (q2response.toLowerCase() == q2ans.toLowerCase()) {
        score += points;
        $("#q2-feedback").css("color", correct);
        $("#q2-feedback").html("Correct!");
    }
    else {
        $("#q2-feedback").css("color", incorrect);
        $("#q2-feedback").html("Wrong!");
    }
    
    if (q3response == q3ans) {
        score += points;
        $("#q3-feedback").css("color", correct);
        $("#q3-feedback").html("Correct!");
    }
    else {
        $("#q3-feedback").css("color", incorrect);
        $("#q3-feedback").html("Wrong!");
    }
    
    if ($("#troosevelt").is(":checked") && $("#tjefferson").is(":checked")
    && !$("#ajackson").is(":checked") && !$("#bfranklin").is(":checked")) {
        score += points;
        $("#q4-feedback").css("color", correct);
        $("#q4-feedback").html("Correct!");
    }
    else {
        $("#q4-feedback").css("color", incorrect);
        $("#q4-feedback").html("Wrong!");
    }
    
    if (q5response == q5ans) {
        score += points;
        $("#q5-feedback").css("color", correct);
        $("#q5-feedback").html("Correct!");
    }
    else {
        $("#q5-feedback").css("color", incorrect);
        $("#q5-feedback").html("Wrong!");
    }
    
    $("#questions").addClass("m-disabled");
    
    scores.push(score);
    localStorage.setItem("previousScores", JSON.stringify(scores));
    
    $("#total-score").html("Your total score is: " + score);
    $("#quiz-count").html(displayCount());
    $("#score-history").html(displayScores());
    
    $("#submitbtn").html("Try Again");
    $("#submitbtn").toggleClass("btn-outline-primary btn-success");
    reset = true;
    
});

function isFormValid() {
    let errors = 0;
    
    if ($("#q1").val() == "") {
        errors++;
    }
    if (!$("#q2").val() || $("#q2").val() == "") {
        console.log("Empty\n");
        errors++;
    }
    if (typeof $("#q3").val() == undefined) {
        errors++;
    }
    if (!$("#troosevelt").is(":checked") && !$("#tjefferson").is(":checked")
    && !$("#ajackson").is(":checked") && !$("#bfranklin").is(":checked")) {
        errors++;
    }
    if ($(".selected").length == 0) {
        errors++;
    }
    
    return errors == 0;
}

/* Displays the amount of times the quiz has been taken */
function displayCount() {
    let s = JSON.parse(localStorage.getItem("previousScores"));
    
    if (!s) return "You have not taken this quiz yet.";
    return "You have taken this quiz " + s.length + " times.";
}

/* Displays all the user's previous scores */
function displayScores() {
    let s = JSON.parse(localStorage.getItem("previousScores"));
    if (!s) return "Your previous scores will appear here.";
    
    let str = "<h5>Previous scores</h5>";
    for (let i = 0; i < s.length; i++) {
        str += (s[i]);
        if (i <s.length - 1)
            str += (", ");
    }
    return str;
}

function tryAgain() {
    /* Clear all user input */
    $("#q1").val("");
    $("#q2").val("Select one:");
    $("input[name='states']").prop("checked", false);
    $("input[name='states']").val("");
    $("input[name='rushmore']:checkbox").prop("checked", false);
    $(".img-choice").removeClass("selected");
    
    $("#questions").removeClass("m-disabled");
    $(".feedback").hide();
    $("#submitbtn").html("Submit");
    $("#submitbtn").toggleClass("btn-outline-primary btn-success");
    reset = false;
}