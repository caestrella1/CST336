<!DOCTYPE html>
<html>
    <head>
        <title>Admin Login | OtterMart</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script type="text/javascript" src="js/functions.js"></script>
        <script>
            /* global $ */
            $(function() {
                $("#error").hide();
                
                $("#login-form").submit(function(e) {
                    e.preventDefault();
                });
                
                $("#login").on("click", function() {
                    $.ajax({
                        method: "POST",
                        data: {
                            "username": $("[name=username]").val(),
                            "password": $("[name=password]").val()
                        },
                        url: "session/login-process.php",
                        success: function(success) {
                            if (success) {
                                window.location.replace("admin.php");
                            }
                            else {
                                $("#error").show();
                            }
                        }
                    });
                });
            });
        </script>
    </head>
    <body class="container mt-5">
        <div class="row">
            <div class="col-4"></div>
            
            <div class="col-4">
                <form id="login-form" class="card" method="POST">
                    <div class="card-body">
                        <h2 class="text-primary">Admin Login</h2>
                        Username: <input class="form-control" type="text" name="username" placeholder="Username"/><br>
                        Password: <input class="form-control mb-2" type="password" name="password" placeholder="Password"/>
                        <span id="error" class="text-danger">Username or password is incorrect.</span>
                        <input id="login" class="btn btn-primary btn-block mt-3" type="submit" value="Log in"/>
                    </div>
                </form>
            </div>
            
            <div class="col-4"></div>
        </div>
    </body>
</html>