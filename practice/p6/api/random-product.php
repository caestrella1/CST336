<?php 

$productArray = array();

$product = array();
$product["name"] = "Microfiber Beach Towel";
$product["price"] = 30.00;
array_push($productArray, $product);

$product = array();
$product["name"] = "Sunscreen 100SPF, 120ml";
$product["price"] = 10.00;
array_push($productArray, $product);

$product = array();
$product["name"] = "Ipanema Flip-flop Sandals";
$product["price"] = 20.00;
array_push($productArray, $product);

echo json_encode($productArray[rand(0,2)]);

?>