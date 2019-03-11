/* global $ */

$(function() {
    
    $("#productQuantity").on("input",function() {
        let itemPrice = parseFloat($("#productPrice").html());
        let quantity = $("#productQuantity").val();
        let total = itemPrice * quantity;
        $("#productTotal").html(total);
    });
    
    $.ajax({
        type: "GET",
        url: "api/random-product.php",
        dataType: "json",
        success: function(data,status) {
        //alert(data);
        $("#productName").html(data.name);
        $("#productPrice").html(data.price);
        },
        complete: function(data,status) { //optional, used for debugging purposes
        //alert(status);
    }
    
    });//ajax
    
    
    $("#promo-code").on("change", function() {
        $.ajax({

            type: "GET",
            url: "api/promos.php",
            dataType: "json",
            data: { "code": $("#promo-code").val() },
            success: function(data,status) {
                if (data != "false") {
                    let subtotal = $("#productTotal").html();
                    
                    let percent = data.discount * 100;
                    $("#discountPercent").html(percent + "%");
                    
                    let discount = parseFloat(subtotal) * parseFloat(data.discount);
                    $("#discount").html("$" + discount);
                }
                else {
                    alert("FALSE");
                }
            },
            complete: function(data,status) { //optional, used for debugging purposes
            //alert(status);
            }
            
        });//ajax
    });
});

function toUSD(n) {
    return Number(n).toLocaleString("en-US", {
        style:"currency", 
        currency:"USD", 
        minimumFractionDigits: 2
    });
}