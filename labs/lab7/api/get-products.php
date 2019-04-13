<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    
    session_start();
    if (!isset($_SESSION["adminName"])) exit;
    
    include "../../../inc/database.php";
    $db = getDatabase("ottermart");
    
    $sql = "SELECT * FROM om_product ORDER BY productPrice";
    $stmt = $db -> prepare($sql);  //$connection MUST be previously initialized
    $stmt->execute();
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC); //use fetch for one record, fetchAll for multiple
    echo json_encode($records, JSON_PRETTY_PRINT);
?>