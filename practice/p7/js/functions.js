/* global $ */

$(function() {
    generatePromo();
    getProducts();
    
    $(document).on("input", ".quantity", function() {
        calculateTotals($(this));
    });
    
    $(document).on("change", "select[name='product-list']", function() {
        getProduct(this.value);
    });
    
});

/*** Database ***/

function generatePromo() {
    $.ajax({
        type: "GET",
        url: "api/promos.php",
        dataType: "json",
        success: function(promo, status) {
            $("#promo-code").val(promo.promoCode);
        }
    });
}

function getProduct(id) {
    $.ajax({
        type: "GET",
        url: "api/products.php",
        dataType: "json",
        data: { "id": id },
        success: function(p, status) {
            addProduct(p);
        }
    });
}

function getProducts() {
    $.ajax({
        type: "GET",
        url: "api/products.php",
        dataType: "json",
        success: function(products, status) {
            products.forEach(function(p, i) {
                if (i == 0) {
                    addProduct(p);
                }
                else {
                    $("#product-list").append(`<option id="option-${p.productId}" value="${p.productId}">${p.productName}</option>`);
                }
            });
        }
    });
}

/*** Functions and Helpers ***/

function addProduct(p) {
    $("#products").append(
        `<tr id="product-${p.productId}">
            <td id="product-${p.productId}-name">${p.productName}</td>
            <td id="product-${p.productId}-price">$${p.productPrice}</td>
            <td><input id="product-${p.productId}-quantity" class="quantity" type="number" size="5"></td>
            <td id="product-${p.productId}-total" class="text-right total"></td>
        </tr>`
    );
    $(`option[value="${p.productId}"]`).remove();
}

/* Calculate the totals of all products */
function calculateTotals(thisEl) {
    let thisProdID = parseID(thisEl.attr("id"));
    let price = parsePrice($(`#product-${thisProdID}-price`).html());
    let quantity = $(`#product-${thisProdID}-quantity`).val();
    let total = price * quantity;
    $(`#product-${thisProdID}-total`).html(toUSD(total));
    
    // TODO: calculate all totals
}

function toUSD(n) {
    return Number(n).toLocaleString("en-US", {
        style:"currency", 
        currency:"USD", 
        minimumFractionDigits: 2
    });
}

/* Extract list ID number from element ID string, otherwise returns null */
function parseID(id) {
    let res = parseInt(id.replace(/[^0-9]/g, ""));
    return isNaN(res) ? null : res;
}

function parsePrice(price) {
    return parseFloat(price.replace(/\$/g, ""));
}