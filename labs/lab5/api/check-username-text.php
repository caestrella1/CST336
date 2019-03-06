<?php 
   $usernames = array("eeny", "meeny", "miny", "maria", "john");
   
   if (in_array($_GET["username"], $usernames)) {
       echo "false";
   }
   else {
       echo "true";
   }
?>