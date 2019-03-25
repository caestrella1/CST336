<?php 

    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("mt_practice");
    
    $promo = $_GET["promo"];
    
    if (!$promo) {
        $sql = "SELECT * FROM mp_codes ORDER BY RAND()";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $records = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($records, JSON_PRETTY_PRINT);
    }
    else {
        
    }

?>