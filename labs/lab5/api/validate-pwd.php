<?php 

    $username = $_GET["username"];
    $pwd = $_GET["pwd"];
    $data = array();
    
    if (stripos($pwd, $username) === false) {
        $data["valid"] = true;
    }
    else {
        $data["valid"] = false;
    }
    
    echo json_encode($data);

?>