<?php
    //Used to check the letter the user inputed in the form, and if the letter is in the word
    //Should return an array of booleans as the api
    header('Content-Type: application/json');
    include "../../../inc/database.php";
    
    $db = getDatabase("hangman");
    $id = $_GET["id"];
    
    $sql = "SELECT word FROM words WHERE word_id = $id";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $record = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $letter = $_GET["letter"];
    $word = $record["word"];
    $check = array(strlen($word));
    
    for ($i = 0; $i < strlen($word); $i++) {
        if (strcmp($letter, $word[$i]) == 0) {
            $check[$i] = true;
        }
        else {
            $check[$i] = false;
        }
    }
    
    echo json_encode($check, JSON_PRETTY_PRINT);
?>