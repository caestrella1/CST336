<?php 
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    
    session_start();
    if (!isset($_SESSION["adminName"])) exit;
    
    include "../../inc/database.php";
    $db = getDatabase("ottermart");
    
    $id = $_POST["productId"];
    $sql = "DELETE FROM om_product WHERE productId = $id";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    
    header("location: admin.php");
?>