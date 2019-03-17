<?php 
    function getDatabase($dbname = "") {
        $host = "localhost";
        $username = "root";
        $password = "";
        
        //checks whether the URL contains "herokuapp" (using Heroku)
        if(strpos($_SERVER['HTTP_HOST'], 'herokuapp') !== false) {
            $url = parse_url(getenv("CLEARDB_DATABASE_URL"));
            $host = $url["host"];
            $dbName = substr($url["path"], 1);
            $username = $url["user"];
            $password = $url["pass"];
        }
        
        $dbconnect = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        // Setting Errorhandling to Exception
        $dbconnect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        return $dbconnect;
    }
?>