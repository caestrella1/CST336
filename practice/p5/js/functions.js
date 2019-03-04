/* global $ */

$(function() {
    getData();
    
    $("#likeundo").hide();
    $("#dislikeundo").hide();
    
    // gray like
    $("#like").on("click", function() {
        $("#like").hide();
        $("#likeundo").show();
        updateData("like");
        
        if ($("#dislikeundo").is(":visible")) {
            $("#dislikeundo").hide();
            $("#dislike").show();
            updateData("cancel_dislike");
        }
    });
    
    // gray dislike
    $("#dislike").on("click", function() {
        $("#dislike").hide();
        $("#dislikeundo").show();
        updateData("dislike");
        
        if ($("#likeundo").is(":visible")) {
            $("#likeundo").hide();
            $("#like").show();
            updateData("cancel_like");
        }
    });
    
    // blue like
    $("#likeundo").on("click", function() {
        $("#likeundo").hide();
        $("#like").show();
        updateData("cancel_like");
    });
    
    // blue dislike
    $("#dislikeundo").on("click", function() {
        $("#dislikeundo").hide();
        $("#dislike").show();
        updateData("cancel_dislike");
    });
    
    $("#comments").on("click", function() {
        getComments();
    });
    
});

function getData() {
    $.ajax({

        type: "GET",
        url: "https://cst336.herokuapp.com/projects/api/videoLikesAPI.php",
        dataType: "json",
        data: { "videoId": "ee1172yeqyE"},
        success: function(data,status) {
            $("#likes").html(data.likes);
            $("#dislikes").html(data.dislikes);
        }
    });
}

function updateData(action) {
    $.ajax({

        type: "GET",
        url: "https://cst336.herokuapp.com/projects/api/videoLikesAPI.php",
        dataType: "json",
        data: { "videoId": "ee1172yeqyE", "action": action},
        success: function(data,status) {
            $("#likes").html(data.likes);
            $("#dislikes").html(data.dislikes);
        }
    });
}

function getComments() {
    $("#comment-section").html("<h3>Comments</h3>");
    
    $.ajax({

        type: "GET",
        url: "https://cst336.herokuapp.com/projects/api/videoLikesAPI.php",
        dataType: "json",
        data: { "videoId": "ee1172yeqyE", "action": "comments"},
        success: function(data,status) {
            for (let i = 0; i < data.length; i++) {
                $("#comment-section").append(
                `<div class="comment">` +
                    `<span class="font-weight-bold">${data[i].author}</span> ` +
                    `<span class="text-muted">${data[i].date}</span><br><span>${data[i].comment}</span>` +
                `</div>`);
            }
        }
    });
}