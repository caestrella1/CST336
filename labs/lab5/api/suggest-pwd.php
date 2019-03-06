<?php 
    $letters = range("a", "z");
    $passLength = $_GET["length"];
    $password = "";
    
    for ($i = 0; $i < $passLength; $i++) {
        $randIndex = rand(0, 25);
        $password .= $letters[$randIndex];
    }
    
    $password[0] = rand(0, 9);
    $password = str_shuffle($password);
    
    $data = array();
    $data["suggested"] = $password;
    
    echo json_encode($data);
?>