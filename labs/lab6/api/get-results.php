<?php
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    
    $db = getDatabase("ottermart");
    
    $namedParams = array();
    $sql = "SELECT * FROM om_product WHERE 1";
    
    $query = $_GET["query"];
    $cat = $_GET["catId"];
    $price_low = $_GET["low"];
    $price_high = $_GET["high"];
    $order = $_GET["order"];
    
    if (!empty($query)) {
        $sql .= " AND (productName LIKE :query OR productDescription LIKE :query)";
        $namedParams[":query"] = "%$query%";
    }
    if (!empty($cat)) {
        $sql .= " AND catId = $cat";
    }
    if ($price_low != NULL) {
        $sql .= " AND productPrice >= $price_low";
    }
    if ($price_high != NULL) {
        $sql .= " AND productPrice <= $price_high";
    }
    if ($order != NULL) {
        $sql .= " ORDER BY $order";
    }
    
    $stmt = $db->prepare($sql);  //$connection MUST be previously initialized
    $stmt->execute($namedParams);
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($records, JSON_PRETTY_PRINT);
?>