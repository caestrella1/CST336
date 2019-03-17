<?php
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("ottermart");
    
    $sql = "SELECT catId, catName FROM om_category ORDER BY catName";
    $stmt = $db->prepare($sql);  //$connection MUST be previously initialized
    $stmt->execute();
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC); //use fetch for one record, fetchAll for multiple
    
    echo json_encode($records, JSON_PRETTY_PRINT);
?>