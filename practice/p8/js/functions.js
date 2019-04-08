/* global $ */

var id = null;
var word = null;
var guesses = 6;

$(function() {
    getWordInfo();
    $("#submit").on("click", function() {
        let letter = $("#letter").val();
        checkWord(letter);
        $("#guess").append(" " + letter);
    });
});

function getWordInfo() {
    $.ajax({
        type: "GET",
        url: "api/get_word_api.php",
        dataType: "json",
        success: function(data) {
            id = data.word_id;
            word = new Array(parseInt(data["length"]));
            $("#word-id").html("");
            for (let i = 0; i < word.length; i++) {
                word[i] = "_";
                $("#word-id").append(" " + word[i]);
            }
        }
    });
}

function checkWord(letter) {
    $.ajax({
        type: "get",
        url: "api/check_word.php",
        data: {
            "letter": letter,
            "id": id
        },
        success: function(data) {
            $("#word-id").html("");
            
            for (let i = 0; i < word.length; i++) {
                if (data[i]) word[i] = letter;
                $("#word-id").append(" " + word[i]);
            }
            guesses--;
            
            if (guesses == 0) alert("GAME OVER!");
        }
    });
}