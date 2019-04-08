/* global $ */

var id = null;
var length = null;

$(function() {
    getWordInfo();
    $("#submit").on("click", function() {
       checkWord();
       addGuess();
    });
});

function getWordInfo() {
    $.ajax({
        type: "GET",
        url: "api/get_word_api.php",
        dataType: "json",
        success: function(data) {
            id = data.word_id;
            length = data["length"];
            $("#word-id").html("");
            for (let i = 0; i < data["length"]; i++) {
                $("#word-id").append(
                    `_ `
                );
            }
            // $("#word-id").val(data.word_id);
        }
    });
}

function checkWord() {
    $.ajax({
        type: "get",
        url: "api/check_word.php",
        data: {
            "letter":$("#letter").val(),
            "id":id
        },
        success: function(data,status) {
            let letter = $("#letter").val();
            
            $("#word-id").html("");
            
            for (let i = 0; i < length; i++) {
                if (data[i]) {
                    $("#word-id").append(` ${letter}`);
               }
               else {
                   $("#word-id").append(` _`);
               }
            } 
        }
    });
}

function addGuess(){
    $("#guess").append(" " + $("#letter").val());
}