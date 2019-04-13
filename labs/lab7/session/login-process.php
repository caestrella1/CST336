<?php
    session_start();
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("ottermart");
    
    $params = array();
    $username = $_POST["username"];
    $password = sha1($_POST["password"]);
    
    $sql = "SELECT * FROM om_admin WHERE username = :username AND password = :password";
    $params["username"] = $username;
    $params["password"] = $password;
    
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $record = $stmt->fetch(PDO::FETCH_ASSOC);

    if (empty($record)) {
        echo "0";
    }
    else {
        echo "1";
        $_SESSION["adminName"] = $record["firstName"] . " " . $record["lastName"];
    }
?>