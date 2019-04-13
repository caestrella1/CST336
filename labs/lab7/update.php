<?php
    session_start();
    include "session/verify-session.php";
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Update Product | OtterMart</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script type="text/javascript" src="js/functions.js"></script>
        <script>
            /* global $ */
            $(function() {
                getCategories();
                
                let productId = <?php echo $_GET['productId']; ?>;
                getProductInfo(productId);
                
                $("#update").on("click", function() {
                    updateProduct();
                });
                
                $("#img").on("change", function() {
                    let img = $("#img-view");
                    img.show();
                    img.prop("src", $("#img").val());
                    
                    img.on("error", function() {
                       img.hide();
                    });
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
                    <h2 class="text-primary">Update Product</h2>
                    <p class="text-muted">Product ID: <span id="id"></span></p>
                    
                    Product Name
                    <input id="name" class="form-control mb-4" type="text" name="product-name" placeholder="Product Name"/>
                    
                    Product Description
                    <textarea id="desc" class="form-control mb-4" rows="5" placeholder="Description"></textarea>
                    
                    Product Image
                    <input id="img" class="form-control mb-4" type="text" name="product-image" placeholder="Image URL"/>
                    <img id="img-view" class="mx-auto d-block mw-100 mh-50"/><br>
                    
                    Product Price
                    <div class="input-group mb-4">
                        <div class="input-group-prepend"><span class="input-group-text bg-success text-white">$</span></div>
                        <input id="price" type="text" class="form-control" placeholder="Product Price">
                    </div>
                    
                    Product Category
                    <select id="categories" class="form-control mb-4" name="categories">
                        <option id="select" disabled selected>Select One</option>
                    </select>
                    
                    <button id="update" class="btn btn-primary btn-block">Update Product</button>
                    <div id="update-success" class="text-success font-weight-bold text-center mt-4 d-none">
                        Product was updated successfully!
                    </div>
                </div>
                
                <div class="col-3"></div>
            </div>
        </div>
        
    </body>
</html>