/* global $ */

let subtotal = 0;
let taxVal = 0.10;
let shipping = 0;
let tax = 0;
let total = 0;

$(function() {
    $("#success").hide();
    
    $(".quantity").on("input", updateTotal);
    $("select[name='shipping']").on("change", updateTotal);
    
    $("#accept").on("change", function() {
        if ($("#accept").is(":checked")) $("#accept-label").removeClass("text-danger");
    });
    
    $("#confirm").on("click", function() {
        if (!$("#accept").is(":checked")) {
            $("#accept-label").addClass("text-danger");
            $("#success").hide();
        }
        else {
            $("#accept-label").removeClass("text-danger");
            $("#success").show();
        }
    });
    
});

function updateTotal() {
    subtotal = 0;
    tax = 0;
    total = 0;
    
    let array = $(".quantity"); /* item quantities */
   
    for (let i = 0; i < 3; i++) {
        let quantity = parseInt($(`#quantity-${i + 1}`).val());
        if(isNaN(quantity)) {
            continue;
        }
        let price = parseFloat($(`#price-${i + 1}`).html().replace("$", ""));
        let total = quantity * price;
        $(`#total-${i + 1}`).html(toUSD(total));
        subtotal += total;
    }
    
    /* calculate totals */
    shipping = parseInt($("select[name='shipping']").val());
    subtotal += shipping;
    tax = subtotal * taxVal;
    total = subtotal + tax;
   
    $("#shipping").html(toUSD(shipping));
    $("#subtotal").html(toUSD(subtotal));
    $("#tax").html(toUSD(tax));
    $("#total").html(toUSD(total));
}

function validateCart() {
    
}

function toUSD(n) {
    return Number(n).toLocaleString("en-US", {
        style:"currency", 
        currency:"USD", 
        minimumFractionDigits: 2
    });
}