/* global $ */

$(function() {
    $(document).on("click", ".btn-like", function() {
        let action = null;
        let pID = $(this).val();
        let src = $(this).prev().attr("src");
        $(this).hasClass("text-white") ? action = "add": action = "delete";
        $(this).toggleClass("text-white text-danger far fas");
        toggleFavorite(pID, src, action);
    });
});

/* Search for an image using a keyword */
function searchImage() {
    $.ajax({
        type: "GET",
        url: "api/pixabay.php",
        dataType: "json",
        data: { "q":$("#keyword").val() },
        success: function(data, status) {
            $("#images").html("");
            data.forEach(function(img) {
               appendImage(img.id, img.webformatURL, false);
            });
        }
    });
}

/* Add image to page */
function appendImage(imgID, imgURL, liked) {
    let heart = "far text-white";
    if (liked) heart = "fas text-danger";
    $("#images").append(
        `<div class="col-4 my-2">` +
            `<div class="position-relative">` +
                `<img class="m-img img-thumbnail rounded-lg" src="${imgURL}">` +
                `<button class="btn-like ${heart} fa-heart position-absolute btn" value="${imgID}"></button>` +
            `</div>` +
        `</div>`
    );
}

/* Decide what to do when a heart button is clicked depending on its state */
function toggleFavorite(id, url, action) {
    $.ajax({
        type: "GET",
        url: "api/favorites.php",
        dataType: "json",
        data: {
            "id": id,
            "keyword":$("#keyword").val(),
            "image": url,
            "action": action
        }
    });
}

/* Display favorites of a specified keyword, if given */
function getFavorites(keyword) {
    $.ajax({
        type: "GET",
        url: "api/favorites.php",
        dataType: "json",
        data: {
            "action": "get",
            "keyword": keyword
        },
        success: function(favorites) {
            $("#images").html("");
            favorites.forEach(function(f) {
              appendImage(f.id, f.imageURL, true);
            });
        }
    });
}

/* Display all the keywords that contain the user's favorites */
function getKeywords() {
    $.ajax({
        type: "GET",
        url: "api/favorites.php",
        dataType: "json",
        data: {
            "action": "keywords"
        },
        success: function(kw) {
            $("#keywords").html("");
            
            $("#keywords").append(
                `<label class="btn btn-outline-primary active">` +
                    `<input type="radio" name="keyword value=''">All` +
                `</label>`
            );
            
            kw.forEach(function(k) {
                $("#keywords").append(
                    `<label class="btn btn-outline-primary">` +
                        `<input type="radio" name="keyword" value="${k.keyword}">${k.keyword}` +
                    `</label>`
                );
            });
        }
    });
}