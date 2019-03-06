<!DOCTYPE html>
<html>
    <head>
        <title>Home | CST 336</title>
        <meta charset="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="css/style.css" type="text/css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script type="text/javascript" src="js/functions.js"></script>
    </head>
    <body class="container light-bg">
            
        <div id="welcome" class="text-center">
            <h1 id="hello">Hello world.</h1>
            <p>Welcome to my repo for <strong>CST 336: Internet Programming.</strong></p>
        </div>
        
        <div class="row">
            
            <div class="col-lg-4">
                <h2>Homework</h2>
                
                <?php 
                    $scan = glob("hw/*");
                    
                    for ($i = 0; $i < count($scan); $i++) {
                        $num = $i + 1;
                        echo 
                        "<a href='{$scan[$i]}'>".
                            "<div class='entry lighter-bg'>".
                                "<span class='file'>Homework {$num}</span>".
                                "<span class='date'>".date("F j, Y",filectime($scan[$i]))."</span>".
                            "</div>".
                        "</a>";
                    }
                
                ?>
            </div>
            
            <div class="col-lg-4">
                <h2>Labs</h2>
                <?php 
                    $scan = glob("labs/*");
                    
                    for ($i = 0; $i < count($scan); $i++) {
                        $num = $i + 1;
                        echo 
                        "<a href='{$scan[$i]}'>".
                            "<div class='entry lighter-bg'>".
                                "<span class='file'>Lab {$num}</span>".
                                "<span class='date'>".date("F j, Y",filectime($scan[$i]))."</span>".
                            "</div>".
                        "</a>";
                    }
                
                ?>
            </div>
            
            <div class="col-lg-4">
                <h2>Practice</h2>
                <?php 
                    $scan = glob("practice/*");
                    
                    for ($i = 0; $i < count($scan); $i++) {
                        $num = $i + 1;
                        echo 
                        "<a href='{$scan[$i]}'>".
                            "<div class='entry lighter-bg'>".
                                "<span class='file'>Practice {$num}</span>".
                                "<span class='date'>".date("F j, Y",filectime($scan[$i]))."</span>".
                            "</div>".
                        "</a>";
                    }
                
                ?>
            </div>
                
        </div>
            
    </body>
</html>