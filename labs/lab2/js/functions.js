/*global $*/
$(function() {
	// Global variables
	var randomNumber = Math.floor(Math.random() * 99) + 1;
	var guessCount = 0;
	var reset = false;
	var wins = 0;
	var losses = 0;
	
	// Page elements
	var userInput = $("#user-in");
	var submit = $("#submit-guess");
	var previous = $("#previous-guesses");
	var result = $("#result-banner");
	var hint = $("#hint-text");
	
	var winCount = $("#win-count");
	var loseCount = $("#lose-count");
	userInput.focus();
	
	submit.on("click", function() {
		if (reset) {
			resetGame();
			return;
		}
		
		let guess = Number(userInput.val());
		
		if (guess < 1 || guess > 99) {
			result.html("Invalid input. Enter a number between 1 and 99.");
			userInput.focus();
			userInput.val("");
			return;
		}
		
		guessCount++;
		previous.append(guess + " ");
		
		if (guess == randomNumber) {
			result.html("Congratulations! You got it right!");
			result.removeClass("bg-danger").addClass("bg-success");
			hint.html("");
			toggleInput();
			wins++;
			winCount.html(wins);
			return;
		} else {
			result.html("Wrong!");
			result.removeClass("bg-success").addClass("bg-danger");
			if (guess < randomNumber) hint.html("Your guess was too low.");
			else hint.html("Your guess was too high.");
		}
		if (guessCount == 7) {
			result.html("Sorry, you lost!");
			toggleInput();
			losses++;
			loseCount.html(losses);
		}
		
		userInput.val("");
		userInput.focus();
	});
	
	// Helper functions
	function resetGame() {
		randomNumber = Math.floor(Math.random() * 99) + 1;
		guessCount = 0;
		result.html("");
		previous.html("");
		hint.html("");
		toggleInput();
		userInput.focus();
		userInput.val("");
	}

	function toggleInput() {
		if (reset) {
			submit.html("Submit Guess");
			submit.toggleClass("btn-danger btn-primary");
			userInput.removeAttr('disabled');
		} else {
			submit.html("Reset");
			submit.toggleClass("btn-danger btn-primary");
			userInput.attr("disabled", "disabled");
		}
		reset = !reset;
	}
});