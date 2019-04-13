<?php 
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    
    session_start();
    if (!isset($_SESSION["adminName"])) exit;
    
    include "../../../inc/database.php";
    $db = getDatabase("ottermart");
    $action = $_GET["action"];
    
    $params = array();
    $params[":name"] = $_GET["name"];
    $params[":desc"] = $_GET["desc"];
    $params[":img"] = $_GET["img"];
    $params[":price"] = $_GET["price"];
    $params[":cat"] = $_GET["cat"];
    
    if ($action == "add") {
        $sql = "INSERT INTO om_product (productName, productDescription, productImage, productPrice, catId) ";
        $sql .= "VALUES (:name, :desc, :img, :price, :cat)";
    }
    else if ($action == "update") {
        $sql = "UPDATE om_product SET productName = :name, productDescription = :desc, productImage = :img, " .
            "productPrice = :price, catId = :cat WHERE productID = :id";
        $params[":id"] = $_GET["productId"];
    }
    
    $stmt = $db->prepare($sql);  //$connection MUST be previously initialized
    $stmt->execute($params);

?>