<?php
    session_start();
    include "session/verify-session.php";
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Product | OtterMart</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script type="text/javascript" src="js/functions.js"></script>
        <script>
            /* global $ */
            $(function() {
                $.ajax({
                    type: "GET",
                    url: "api/get-product-info.php",
                    dataType: "json",
                    data: {
                        "productId": <?=$_GET['productId'];?>
                    },
                    success: function(p) {
                        $("#name").html(p.productName);
                        $("#desc").html(p.productDescription);
                        $("#img").prop("src", p.productImage);
                        $("#price").html(p.productPrice);
                        $("#categories").val(p.catId);
                    }
                });
            });
        </script>
    </head>
    <body>
        
        <div class="container">
            <div class="row">
                
                <div class="col-12">
                    <h2 id="name"></h2>
                    <h3 class="text-success">$<span id="price"></span></h3>
                    <img id="img" class="float-right w-50 mw-100 mx-2">
                    <h4 class="text-primary">Description</h4>
                    <p id="desc"></p>
                </div>
                
            </div>
        </div>
        
    </body>
</html>