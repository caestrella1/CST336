<?php 

$promoArray = array();

$promo = array();
$promo["code"] = "getFifty";
$promo["discount"] = "0.50";
array_push($promoArray, $promo);

$promo = array();
$promo["code"] = "halfPrice";
$promo["discount"] = 0.50;
array_push($promoArray, $promo);

$promo = array();
$promo["code"] = "sand30";
$promo["discount"] = 0.30;
array_push($promoArray, $promo);

$promo = array();
$promo["code"] = "spring30";
$promo["discount"] = 0.30;
array_push($promoArray, $promo);

$promo = array();
$promo["code"] = "beach";
$promo["discount"] = 0.20;
array_push($promoArray, $promo);

$promo = array();
$promo["code"] = "sunny";
$promo["discount"] = 0.20;
array_push($promoArray, $promo);

// echo json_encode($promoArray);

for ($i = 0; $i < count($promoArray); $i++) {
    if (in_array($_GET["code"], $promoArray[$i]) ) {
        echo json_encode($promoArray[$i]);
        return;
    }
}

echo "false";

?>