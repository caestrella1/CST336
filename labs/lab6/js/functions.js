/* global $ */

$(function() {
    $.ajax({

        type: "GET",
        url: "api/get-products.php",
        dataType: "json",
        success: function(data,status) {
            data.forEach(function(product) {
                $("#products").append(`<b>${product.productName}</b>: $${product.productPrice}<br>` +
                `<em>${product.productDescription}</em><br><br>`);
            });
        },
        complete: function(data,status) { //optional, used for debugging purposes
            // alert(status);
        }
        
    });
    
});