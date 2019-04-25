<?php 
    header('Content-Type: application/json');
    $q = $_GET["q"];
    $results = 50;
    
    $curl = curl_init();
      curl_setopt_array($curl, array(
      CURLOPT_URL => "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=$q&image_type=photo&orientation=horizontal&safesearch=true&per_page=$results",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_HTTPHEADER => array("cache-control: no-cache"),
    ));

    $data = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    
    $data = json_decode($data, true);
    $images = $data["hits"];
    
    shuffle($images);
    $images = array_slice($images, 0, 9);
    
    echo json_encode($images, JSON_PRETTY_PRINT);
    
?>