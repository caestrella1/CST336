<?php 
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("hw4meals");
    
    $params = array();
    $action = $_GET["action"];
    
    if ($action == "add") {
        $params[":user"] = $_GET["user"];
        $params[":meal"] = $_GET["meal"];
        $sql = "INSERT INTO favoriteMeals (userID, mealID) VALUES (:user, :meal)";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
    }
    else if ($action == "delete") {
        $params[":user"] = $_GET["user"];
        $params[":meal"] = $_GET["meal"];
        $sql = "DELETE FROM favoriteMeals WHERE userID = :user AND mealID = :meal";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
    }
    else if ($action == "get") {
        $params[":user"] = $_GET["user"];
        $sql = "SELECT * FROM favoriteMeals where userID = :user";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $favs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($favs, JSON_PRETTY_PRINT);
    }
    
?>