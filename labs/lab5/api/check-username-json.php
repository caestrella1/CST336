<?php 

    header('Access-Control-Allow-Origin: *');
    
    $usernames = array("eeny", "meeny", "miny", "maria", "john");
    $username = array();
    
    if (in_array(strtolower($_GET["username"]), $usernames) ) {
        $username["available"] = false;
    }
    else {
        $username["available"] = true;
    }
    
    echo json_encode($username);
?>