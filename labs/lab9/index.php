<?php 

    function moveUpload() {
        if (!empty($_FILES))
            move_uploaded_file($_FILES['my-file']['tmp_name'], "gallery/" . $_FILES['my-file']['name']);
    }
    
    function getGallery() {
        $gallery = scandir("gallery");
                
        for ($i = 2; $i < count($gallery); $i++) {
            $gallery[$i] = "gallery/$gallery[$i]";
        }
        return json_encode(array_splice($gallery, 2));
    }
    
    moveUpload();

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Photo Gallery | Lab 9</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script type="text/javascript" src="js/main.js"></script>
        <script>
            $(function() {
               getGallery(<?=getGallery();?>); 
            });
        </script>
    </head>
    
    <body>
        <main class="container">
            
            <div class="row">
                <div class="col-12 mt-5">
                    
                    <div class="card col-12 col-lg-6 mx-auto shadow rounded-lg">
                        <div class="card-body">
                            
                            <h3 class="m-0">Upload to Gallery</h3>
                            <p id="max-size" class="mb-2 text-muted">Maximum upload size: 1 MB</p>
                    
                            <form id="file-form" class="input-group" method="POST" enctype="multipart/form-data">
                                <div class="custom-file">
                                    <input id="upload" type="file" class="custom-file-input" name="my-file">
                                    <label id="upload-label" class="custom-file-label" for="upload">Choose an image...</label>
                                </div>
                                <div class="input-group-append">
                                    <button id="btn-upload" class="btn btn-primary" type="submit" disabled="true">Upload</button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                    
                </div>
                
            </div><!-- row -->
            
            <div class="row">
                <div class="col-12 mt-4">
                    <h1 class="mb-0">Photo Gallery</h1>
                    <h4 class="text-muted"><span id="photo-count"></span> Photos</h4>
                </div>
            </div>
            
            <div class="row">
                <div id="gallery-empty" class="col-12 text-center my-5">
                    <h4>No Photos</h4>
                    <h6 class="text-muted">Start uploading photos above</h6>
                </div>
                
                <div id="gallery" class="col-12 card-columns mt-2 mb-5"></div>
            </div>
            
        </main>
        
    </body>
    
</html>