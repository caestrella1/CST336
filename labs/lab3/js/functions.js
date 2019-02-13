/* global $ */
var q1points = 25, q2points = 25, q3points = 25;
var q1ans = "Sacramento";
var q2ans = "Missouri River";
var q3ans = "Rhode Island";

// HEX values for text colors
var correct = "#189E35";
var incorrect = "#FF3B2F";

$("#submitbtn").on("click", function() {
    let score = 0; // initialize score
    
    // Get user responses
    let q1response = $("#q1").val();
    let q2response = $("#q2").val();
    let q3response = $("input[name='states']:checked").val();
    
    $(".feedback").css("display", "block");
   
    if (q1response.toLowerCase() == q1ans.toLowerCase()) {
        score += q1points;
        $("#q1-feedback").css("color", correct);
        $("#q1-feedback").html("Correct!");
    }
    else {
        $("#q1-feedback").css("color", incorrect);
        $("#q1-feedback").html("Wrong!");
    }
    // Check if response value is NULL (ie user didn't respond to question)
    if (q2response && q2response.toLowerCase() == q2ans.toLowerCase()) {
        score += q2points;
        $("#q2-feedback").css("color", correct);
        $("#q2-feedback").html("Correct!");
    }
    else {
        $("#q2-feedback").css("color", incorrect);
        $("#q2-feedback").html("Wrong!");
    }
    
    if (q3response == q3ans) {
        score += q3points;
        $("#q3-feedback").css("color", correct);
        $("#q3-feedback").html("Correct!");
    }
    else {
        $("#q3-feedback").css("color", incorrect);
        $("#q3-feedback").html("Wrong!");
    }
   
  $("#total-score").html("Your total score is: " + score);
});