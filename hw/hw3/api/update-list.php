<?php 
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("reminders");
    
    $record = null;
    $list = $_GET["list"];
    $user = $_GET["user"];
    $title = $_GET["title"];
    $desc = $_GET["desc"];
    $params = array();
    
    /* If a list ID wasn't provided, it does not exist and should be created */
    if (empty($list)) {
        $sql = "INSERT INTO r_lists (listID, userID, listName, listDesc) VALUES (NULL, :user, :title,";
        $params["user"] = $user;
        $params["title"] = $title;
        
        // if the description is filled, add it, otherwise, insert NULL
        if ($desc) {
            $sql .= " :desc)";
            $params["desc"] = $desc;
        }
        else {
            $sql .= " NULL)";
        }
        
        // execute the command separately from select
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        
        /* Select newly created list */
        $sql = "SELECT * FROM r_lists WHERE userID = $user ORDER BY listID DESC LIMIT 1";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $record = $stmt->fetch(PDO::FETCH_ASSOC);
    }
    /* Otherwise, the list exists and should just be updated */
    else {
        $sql = "UPDATE r_lists SET listName = :name, listDesc = :desc WHERE r_lists.listID = :list";
        $params["name"] = $title;
        $params["desc"] = $desc;
        $params["list"] = $list;
        // execute the command separately from select
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        
        $sql = "SELECT * FROM r_lists WHERE listID = $list";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $record = $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    echo json_encode($record, JSON_PRETTY_PRINT);

?>