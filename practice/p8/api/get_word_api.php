<?php

    //Gets random word from the api and returns its length and id.
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    $db = getDatabase("hangman");
    
    $randomNum = mt_rand(1, 7);
    $sql = "SELECT word_id, length(word) length FROM words WHERE word_id = $randomNum";
    $stmt = $db->prepare($sql);  
    $stmt->execute();
    $record = $stmt->fetch(PDO::FETCH_ASSOC); 
    
    echo json_encode($record, JSON_PRETTY_PRINT);

?>