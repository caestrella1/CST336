<?php 
    session_start();
    if (!isset($_SESSION["adminName"])) {
        header("location: login.php");
    }
?>