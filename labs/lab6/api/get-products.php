<?php 

    $host = "localhost";
    $dbname = "ottermart";
    $username = "root";
    $password = "";

    $dbconnect = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    // Setting Errorhandling to Exception
    $dbconnect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "SELECT * FROM om_product ORDER BY productPrice ASC LIMIT 10";
    $stmt = $dbconnect -> prepare($sql);  //$connection MUST be previously initialized
    $stmt->execute();
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC); //use fetch for one record, fetchAll for multiple
    
    echo json_encode($records);

?>