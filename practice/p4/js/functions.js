/* global $ */

$(function() {
    var subtotal = 0;
    
    $(".quantity").on("change", function() {
        subtotal = 0;
        
       let array = $(".quantity"); // input number
       
      for (let i = 0; i < 3; i++) {
          let quantity = parseInt($(`#item-${i + 1}-quantity`).val());
          if(isNaN(quantity)){
              continue;
          }
          let price = parseFloat($(`#item-${i + 1}-price`).html());
          let total = quantity * price;
          $(`#total-${i + 1}`).html("$" + total);
          subtotal += total;
          //alert(subtotal);
      }
       
       $("#subtotal").html("$" + subtotal);
       
    });
    
//   $("#item-1-quantity").on("change", function() {

//         let itemQuantity1 = parseInt($("#item-1-quantity").val());
//         let itemPrice1 = parseFloat($("#item-1-price").html());
//         console.log(itemPrice1);
    
//         var totalItem1 = itemQuantity1 * itemPrice1;
//         $("#total-1").html("$"+ totalItem1);
//         subtotal += totalItem1;
//         alert(subtotal);
//     });
//     $("#item-2").on("change", function() {

//         let itemQuantity2 = parseInt($("#item-2").val());
//         let itemPrice2 = parseFloat($("#item-2-price").html());
//         console.log(itemPrice2);
    
//         var totalItem2 = itemQuantity2 * itemPrice2;
//         $("#total-2").html("$"+ totalItem2);
//         subtotal += totalItem2;
//         alert(subtotal);
//     }); 
//     $("#item-3").on("change", function() {

//         let itemQuantity3 = parseInt($("#item-3").val());
//         let itemPrice3 = parseFloat($("#item-3-price").html());
//         console.log(itemPrice3);
    
//         var totalItem3 = itemQuantity3 * itemPrice3;
//         $("#total-3").html("$"+ totalItem3);
//         subtotal += totalItem3;
//         alert(subtotal);
//     });
});