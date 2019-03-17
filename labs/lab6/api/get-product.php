<?php 
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("ottermart");
    
    $productId = $_GET["productId"];
    $sql = "SELECT * FROM om_product pd LEFT JOIN om_purchase ps ON pd.productId = ps.productId WHERE pd.productId = $productId";
    
    $stmt = $db->prepare($sql);  //$connection MUST be previously initialized
    $stmt->execute();
    $records = $stmt->fetch(PDO::FETCH_ASSOC); //use fetch for one record, fetchAll for multiple
    
    echo json_encode($records, JSON_PRETTY_PRINT);
?>