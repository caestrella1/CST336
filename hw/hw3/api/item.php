<?php 
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("reminders");
    
    $user = $_GET["user"];
    $list = $_GET["list"];
    $itemID = $_GET["itemID"];
    $item = $_GET["item"];
    $status = $_GET["status"];
    $action = $_GET["action"];
    $params = array();
    
    $output = "";
    
    if ($action == "get") {
        $sql = "SELECT * FROM r_items WHERE listID = $list";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $output = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    else if ($action == "update") {
        /* Update the item first */
        $sql = "UPDATE r_items SET itemEntry = :text, isDone = :status WHERE itemID = :id";
        $params["text"] = $item;
        $params["id"] = $itemID;
        $params["status"] = ($status == "true") ? "1" : "0";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        
        /* Then select it */
        $sql = "SELECT * FROM r_items WHERE itemID = $itemID";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $output = $stmt->fetch(PDO::FETCH_ASSOC);
    }
    else if ($action == "create") {
        $sql = "INSERT INTO r_items (itemID, userID, listID, itemEntry, isDone) VALUES (NULL, :user, :list, :item, :status)";
        $params["user"] = $user;
        $params["list"] = $list;
        $params["item"] = $item;
        $params["status"] = ($status == "true") ? "1" : "0";
        
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        
        /* Then select it */
        $sql = "SELECT * FROM r_items WHERE userID = $user ORDER BY itemID DESC LIMIT 1";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $output = $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    echo json_encode($output, JSON_PRETTY_PRINT);
?>