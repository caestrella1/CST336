/* global $ localStorage */

var userID;

$(function() {
    getUserID();
    
    $("#btn-search").on("click", function(e) {
        e.preventDefault(); // don't reload the page
        search();
    });
    
    $(document).on("click", ".btn-like", function() {
        $(this).toggleClass("text-muted text-danger");
        
        let btn = null;
        ($(this).hasClass("text-muted")) ? btn = "Add to Favorites" : btn = "Remove from Favorites";
        $(this).find("span").html(btn);
        $(this).find("i").toggleClass("fas far");
        
        toggleFavorite(userID, $(this));
    });
});

/* Add or delete a favorite meal from the DB depending on the active class */
function toggleFavorite(user, mealObj) {
    $.ajax({
        type: "GET",
        url: "api/favorites.php",
        dataType: "json",
        data: {
            "action": (mealObj.hasClass("text-danger") ? "add" : "delete"),
            "user": user,
            "meal": mealObj.val(),
        },
    });
}

/* Add a meal to the UI */
function appendMeal(divID, meal) {
    let heart = "far", textColor = "text-muted", text = "Add to Favorites";
    if (divID == "#favorites") {
        heart = "fas";
        textColor = "text-danger";
        text = "Remove from Favorites";
    }
    
    $(divID).append(
        `<div class="col-12 col-lg-4 mb-4">` +
            `<div class="card shadow rounded-lg">` +
                `<img src="${meal.strMealThumb}" class="card-img-top" alt="...">` +
                `<div class="card-body">` +
                    `<h5 class="card-title">${meal.strMeal}</h5>` +
                    `<ul class="list-group list-group-flush">` +
                        `<li class="list-group-item text-info">` +
                            `<i class="fas fa-tag mr-2"></i> ${meal.strArea}, ${meal.strCategory}` +
                        `</li>` +
                        (meal.strYoutube ? 
                        `<li class="list-group-item">` +
                            `<a href="${meal.strYoutube}" target="_blank" class="card-link text-danger">` +
                                `<i class="fab fa-youtube mr-2"></i> View on YouTube</a>` +
                        `</li>` : "") +
                        `<li class="list-group-item">` +
                            `<button class="btn btn-like ${textColor} bg-transparent border-0 px-0" value="${meal.idMeal}">` +
                                `<i class="${heart} fa-heart mr-2"></i><span>${text}</span>` +
                            `</button>` +
                        `</li>` +
                    `</ul>` +
                `</div>` +
            `</div>` +
        `</div>`
    );
}

/* Search for a meal with any given query */
function search() {
    $("#results").html("");
    $.ajax({
        type: "GET",
        url: "https://www.themealdb.com/api/json/v1/1/search.php",
        dataType: "json",
        data: { "s": $("#search-bar").val() },
        success: function(meals, status) {
            if (!meals.meals) {
                $("#query").html(`No results found for "${$("#search-bar").val()}"`);
                return;
            }
            $("#query").html(`Showing ${meals.meals.length} results for "${$("#search-bar").val()}"`);
            meals.meals.forEach(function(m) {
                appendMeal("#results", m);
            });
        }
    });
}

/* Get the userID from localStorage or generate and save an ID if it doesn't exist */
function getUserID() {
    if (localStorage.getItem("userID")) {
        userID = localStorage.getItem("userID");
    }
    else {
        let randID = Math.floor(Math.random() * 10000);
        userID = randID;
        localStorage.setItem("userID", userID);
    }
}

function getFavorites() {
    $.ajax({
        type: "GET",
        url: "api/favorites.php",
        dataType: "json",
        data: {
            "action": "get",
            "user": userID
        },
        success: function(meals, status) {
            meals.forEach(function(m) {
                getMeal(m.mealID);
            });
        }
    });
}

function getMeal(mealID) {
    $.ajax({
        type: "GET",
        url: "https://www.themealdb.com/api/json/v1/1/lookup.php",
        dataType: "json",
        data: { "i": mealID },
        success: function(meals, status) {
            appendMeal("#favorites", meals.meals[0]);
        }
    });
}