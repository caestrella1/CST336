<?php
    session_start();
    include "session/verify-session.php";
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Add Product | OtterMart</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script type="text/javascript" src="js/functions.js"></script>
        <script>
            /* global $ */
            $(function() {
                getCategories();
                
                $("#add").on("click", function() {
                    addProduct();
                });
                
                $("#img").on("change", function() {
                    $("#img-view").prop("src", $("#img").val());
                });
            });
        </script>
    </head>
    
    <body>
        <?php include "parts/header.php"; ?>
        
        <div class="container">
            <div class="row">
                <div class="col-3"></div>
                
                <div class="col-6 mb-5">
                    <h2 class="text-primary">Add Product</h2>
                    
                    Product Name
                    <input id="name" class="form-control mb-4" type="text" name="product-name" placeholder="Product Name"/>
                    
                    Product Description
                    <textarea id="desc" class="form-control mb-4" placeholder="Description"></textarea>
                    
                    Product Image
                    <input id="img" class="form-control mb-4" type="text" name="product-image" placeholder="Image URL"/>
                    <img id="img-view" class="mx-auto d-block mw-100 mh-50"/><br>
                    
                    Product Price
                    <div class="input-group mb-4">
                        <div class="input-group-prepend"><span class="input-group-text bg-success text-white">$</span></div>
                        <input id="price" type="text" class="form-control" placeholder="Price">
                    </div>
                    
                    Product Category
                    <select id="categories" class="form-control mb-4" name="categories">
                        <option id="select" disabled selected>Select One</option>
                    </select>
                    
                    <button id="add" class="btn btn-primary btn-block">Add Product</button>
                </div>
                
                <div class="col-3"></div>
            </div>
        </div>
        
    </body>
</html>