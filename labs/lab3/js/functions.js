/* global $ */
var points = 20;
var q1ans = "Sacramento";
var q2ans = "Missouri River";
var q3ans = "Rhode Island";
var q5ans = "seal2";

/* LocalStorage can only store strings/ints, need to parse/format array */
var scores = JSON.parse(localStorage.getItem("previousScores"));
if (!scores) scores = [];

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
        $("#q1-mark").html("<img src='img/checkmark.png' alt='checkmark'/>");
    }
    else {
        $("#q1-feedback").css("color", incorrect);
        $("#q1-feedback").html("Wrong!");
        $("#q1-mark").html("<img src='img/xmark.png' alt='xmark'/>");
    }
    
    // Check if response value is NULL (ie user didn't respond to question)
    if (q2response.toLowerCase() == q2ans.toLowerCase()) {
        score += points;
        $("#q2-feedback").css("color", correct);
        $("#q2-feedback").html("Correct!");
        $("#q2-mark").html("<img src='img/checkmark.png' alt='checkmark'/>");
    }
    else {
        $("#q2-feedback").css("color", incorrect);
        $("#q2-feedback").html("Wrong!");
        $("#q2-mark").html("<img src='img/xmark.png' alt='xmark'/>");
    }
    
    if (q3response == q3ans) {
        score += points;
        $("#q3-feedback").css("color", correct);
        $("#q3-feedback").html("Correct!");
        $("#q3-mark").html("<img src='img/checkmark.png' alt='checkmark'/>");
    }
    else {
        $("#q3-feedback").css("color", incorrect);
        $("#q3-feedback").html("Wrong!");
        $("#q3-mark").html("<img src='img/xmark.png' alt='xmark'/>");
    }
    
    if ($("#troosevelt").is(":checked") && $("#tjefferson").is(":checked")
    && !$("#ajackson").is(":checked") && !$("#bfranklin").is(":checked")) {
        score += points;
        $("#q4-feedback").css("color", correct);
        $("#q4-feedback").html("Correct!");
        $("#q4-mark").html("<img src='img/checkmark.png' alt='checkmark'/>");
    }
    else {
        $("#q4-feedback").css("color", incorrect);
        $("#q4-feedback").html("Wrong!");
        $("#q4-mark").html("<img src='img/xmark.png' alt='xmark'/>");
    }
    
    if (q5response == q5ans) {
        score += points;
        $("#q5-feedback").css("color", correct);
        $("#q5-feedback").html("Correct!");
        $("#q5-mark").html("<img src='img/checkmark.png' alt='checkmark'/>");
    }
    else {
        $("#q5-feedback").css("color", incorrect);
        $("#q5-feedback").html("Wrong!");
        $("#q5-mark").html("<img src='img/xmark.png' alt='xmark'/>");
    }

    scores.push(score);
    localStorage.setItem("previousScores", JSON.stringify(scores));
    
    if (score == 100)
        $("#total-score").html("Congratulations!<br> Your total score is " + score);
    else
        $("#total-score").html("Your total score is: " + score);
        
    $("#quiz-count").html(displayCount());
    $("#score-history").html(displayScores());
});

$("#clear-history").on("click", function() {
   scores = [];
   localStorage.setItem("previousScores", JSON.stringify(scores));
   $("#quiz-count").html(displayCount());
   $("#score-history").html(displayScores());
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
    
    if (!s || s.length == 0) return "You have not taken this quiz yet.";
    return "You have taken this quiz " + s.length + " times.";
}

/* Displays all the user's previous scores */
function displayScores() {
    let s = JSON.parse(localStorage.getItem("previousScores"));
    if (!s || s.length == 0) return "Your score history will appear here.";
    
    let str = "<h5>Score History</h5>";
    s.forEach(function(score, i) {
        str += (score);
        if (i <s.length - 1)
            str += (", ");
    });
    return str;
}