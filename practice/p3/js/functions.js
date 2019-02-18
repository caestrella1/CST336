/* global $ */

let imageArray = ["cherry", "grapes", "seven"];
let elementArray = $(".slot");
let winAmount = [100, 300, 500];
let randomImage = new Array(3);
let winnings = 0;

$("#play-btn").on("click", function() {
    
    for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * 3);
        randomImage[i] = imageArray[randomIndex];
        elementArray[i].src = "img/" + randomImage[i] + ".png";
    }
    
    if (checkImage("cherry")) {
        winnings += winAmount[0];
        $("#win").html(winAmount[0]);
        $("#win-title").show();
    }
    else if (checkImage("grapes")) {
        winnings += winAmount[1];
        $("#win").html(winAmount[1]);
        $("#win-title").show();
    }
    else if (checkImage("seven")) {
        winnings += winAmount[2];
        $("#win").html(winAmount[2]);
        $("#win-title").show();
        $("#jackpot").html("JACKPOT!");
        
        var audioElement = document.createElement('audio');
        audioElement.setAttribute("src","audio/jackpot.m4a");
        audioElement.play();
    }
    else {
        $("#win-title").hide();
        $("#jackpot").html("Try Again");
    }
    
    $("#winnings").html(winnings);
    
});

function checkImage(img) {
    let count = 0;
    
    for (let i = 0; i < 3; i++)
        if (randomImage[i] == img)
            count++;
    
    if (count == 3)
        return true;
    return false;
}