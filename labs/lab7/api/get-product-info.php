<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    
    session_start();
    if (!isset($_SESSION["adminName"])) exit;
    
    include '../../../inc/database.php';
    $db = getDatabase("ottermart");

    $productId = $_GET['productId'];
    
    $sql = "SELECT * FROM om_product WHERE productId = $productId";
    
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($product, JSON_PRETTY_PRINT);

?>