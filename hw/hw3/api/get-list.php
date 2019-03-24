<?php 
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("reminders");
    
    $output = null;
    $user = $_GET["user"];
    $list = $_GET["list"];
    
    /* If a list isn't specified, get all the user's lists */
    if (!$list && $user) {
        $sql = "SELECT * FROM r_lists WHERE userID = $user ORDER BY listID DESC";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $output = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    /* Otherwise, get the specified list's items */
    else if (!$user && $list) {
        $sql = "SELECT * FROM r_items NATURAL JOIN r_lists WHERE listID = $list";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $output = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    echo json_encode($output, JSON_PRETTY_PRINT);
?>