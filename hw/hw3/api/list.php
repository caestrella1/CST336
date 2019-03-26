<?php 
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("reminders");
    
    $output = null;
    $user = $_GET["user"];
    $list = $_GET["list"];
    $title = $_GET["title"];
    $desc = $_GET["desc"];
    $action = $_GET["action"];
    $params = array();
    
    if ($action == "get") {
        /* If only a user is specified, get all the user's lists */
        if ($user) {
            $sql = "SELECT * FROM r_lists WHERE userID = $user ORDER BY listID DESC";
            $stmt = $db->prepare($sql);
            $stmt->execute();
            $output = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        /* If a list is specified, get that list only */
        else if ($list) {
            $sql = "SELECT * FROM r_lists WHERE listID = $list";
            $stmt = $db->prepare($sql);
            $stmt->execute();
            $output = $stmt->fetch(PDO::FETCH_ASSOC);
        }
    }
    else if ($action == "update") {
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
        $output = $stmt->fetch(PDO::FETCH_ASSOC);
    }
    else if ($action == "create") {
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
        $output = $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    echo json_encode($output, JSON_PRETTY_PRINT);
?>