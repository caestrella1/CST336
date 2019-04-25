<?php 
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("pixabay");
    
    $params = array();
    $action = $_GET["action"];
    
    if ($action == "add") {
        $params[":img"] = $_GET["image"];
        $params[":keyword"] = $_GET["keyword"];
        $id = $_GET["id"];
        $sql = "INSERT INTO favoritePix (id, imageURL, keyword) VALUES ($id, :img, :keyword)";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
    }
    else if ($action == "delete") {
        $id = $_GET["id"];
        $sql = "DELETE FROM favoritePix WHERE id = $id";
        $stmt = $db->prepare($sql);
        $stmt->execute();
    }
    else if ($action == "get") {
        $sql = "SELECT * FROM favoritePix";
        
        $params[":keyword"] = $_GET["keyword"];
        if ($params[":keyword"]) {
            $sql .= " WHERE keyword = :keyword";
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
        }
        else {
            $stmt = $db->prepare($sql);
            $stmt->execute();
        }
        
        $favs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($favs, JSON_PRETTY_PRINT);
    }
    else if ($action == "keywords") {
        $sql = "SELECT DISTINCT keyword FROM favoritePix";
        
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $favs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($favs, JSON_PRETTY_PRINT);
    }
    
?>