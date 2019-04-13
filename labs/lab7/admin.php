<?php
    session_start();
    include "session/verify-session.php";
?>

<!DOCTYPE html>
<html>
    <head>
        <title>OtterMart Admin Console</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script type="text/javascript" src="js/functions.js"></script>
        <script>
            /* global $ */
            $(function() {
                getProducts();
            });
        </script>
    </head>
    <body>
        <?php include "parts/header.php"; ?>
        
        <div class="container">
            <div class="row">
                
                <div class="col-12">
                    <h3>Welcome, <?=$_SESSION["adminName"]?></h3>
        
                    <form action="add.php">
                        <button class="btn btn-primary">Add New Product</button>
                    </form>
                
                    <div id="products"></div>
                </div>
                
                
                <!-- Modal -->
                <div class="modal fade" id="product-info" tabindex="-1" role="dialog" aria-labelledby="product-id" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Product Info</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <iframe name="productIframe"  width="100%" height="400" style="border: none;"></iframe>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                </div>
                
            </div>
        </div>
        
    </body>
</html>