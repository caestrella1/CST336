<?php 

    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("mt_practice");
    
    $id = $_GET["id"];
    
    /* Get everything */
    if (!$id) {
        $sql = "SELECT * FROM mp_product ORDER BY RAND()";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($records, JSON_PRETTY_PRINT);
    }
    /* Get one */
    else {
        $sql = "SELECT * FROM mp_product WHERE productId = $id";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $records = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($records, JSON_PRETTY_PRINT);
    }

?>