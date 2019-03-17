/* global $ */

$(function() {
    $("#results").hide();
    getCategories();
    
    $("#search-button").on("click", function() {
        getResults();
    });
    
    $('#item-modal').on('show.bs.modal', function(e) {
        getProduct(e.relatedTarget.id);
    });
    
});

function getCategories() {
    $.ajax({
        type: "GET",
        url: "api/get-categories.php",
        dataType: "json",
        success: function(data, status) {
            data.forEach(function(cat) {
                $("#category").append(`<option id="cat-${cat["catId"]}" value=${cat["catId"]}>${cat["catName"]}</option>`);
            });
        }
    });
}

function getResults() {
    $.ajax({
        type: "GET",
        url: "api/get-results.php",
        dataType: "json",
        data: {
            "query": $("input[name='query']").val(),
            "catId": $("select[name='category'] option:selected").val(),
            "low": $("input[name='price-low']").val(),
            "high": $("input[name='price-high']").val(),
            "order": $("input[name='order']:checked").val()
        },
        success: function(data, status) {
            
            $("#products").html("");
            
            if (data.length > 0) {
                $("#results").show();
                $("#search-count").html(data.length);
                
                data.forEach(function(p) {
                    let catName = $(`#cat-${p.catId}`).text();
                    $("#products").append(
                        `<div id="product-${p.productId}" class="card product-entry my-3" data-toggle="modal" data-target="#item-modal">` +
                            `<div class="card-body d-flex flex-row justify-content-between align-items-center">` +
                                `<img class="rounded img-thumbnail product-image" src="${p.productImage}"/>` +
                                `<span class="product-name">${p.productName}</span>` +
                                `<span class="product-category text-muted">${catName}</span>` +
                                `<span class="product-price text-success font-weight-bold text-right">$${p.productPrice}</span>` +
                            `</div>` +
                        `</div>`
                    );
                });
            }
            else {
                $("#results").hide();
                $("#products").html(`<h3 class="text-center text-muted">Your query returned no results.</h3>` +
                `<p class="text-center text-muted">Please modify your search and try again.</p>`);
            }
            
        }
    });
}

function getProduct(productId) {
    $.ajax({
        type: "GET",
        url: "api/get-product.php",
        dataType: "json",
        data: { "productId": productId.replace(/[^0-9]/gi,"") },
        success: function(p, status) {
            $("#modal-title").html(`${p.productName} <span class="d-block text-success font-weight-bold">$${p.productPrice}</span>`);
            $("#modal-image").attr("src", p.productImage);
            $("#modal-description").html(p.productDescription);
            
            if (p.productId) {
                $("#modal-history").html(`<ul><li>Purchased: ${p.purchaseDate} (Quantity ${p.quantity})</li></ul>`);
            }
            else {
                $("#modal-history").html(`<span class="text-muted">This product has not been purchased.</span>`);
            }
            
        }
    });
}