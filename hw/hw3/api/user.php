<?php 
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("reminders");
    
    // Generate a userID and insert it into the table
    $sql = "INSERT INTO r_users VALUE(NULL)";
    
    // execute the command separately from select
    $stmt = $db->prepare($sql);
    $stmt->execute();
    
    // THEN select the newly created ID
    $sql = "SELECT userID FROM r_users ORDER BY userID DESC LIMIT 1";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $records = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode($records, JSON_PRETTY_PRINT);

?>