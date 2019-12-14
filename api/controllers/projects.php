<?php
header('Content_Type: application/json'); //sending back json
include_once __DIR__ . '/../models/museum.php'; //include what is in the models directory up out the controllers dir and into models
if($_REQUEST['action'] === 'index'){  //take a look at the (req.query or params) created an action query parameter with a value of index. if the action property = index then run the echo to send back json People::all (which basically returns the array)
    echo json_encode(Museums::all());
} else if($_REQUEST['action'] === 'create'){
    $request_body = file_get_contents('php://input');
    $body_object = json_decode($request_body);
    $new_museum = new Museum(null, $body_object->name, $body_object->location, $body_object->guided_tours_available);
    $all_lmuseums = Museums::create($new_museum);
    echo json_encode($all_museums);
} else if ($_REQUEST['action'] === 'update'){
    $request_body = file_get_contents('php://input');
    $body_object = json_decode($request_body);
    $updated_museum = new Museum ($_REQUEST['id'], $body_object->name, $body_object->location, $body_object->guided_tours_available); //just holding data
    $all_museums = Museums::update($updated_museum);
    echo json_encode($all_museums);
} else if ($_REQUEST['action'] === 'delete'){
    $all_museums = Museums::delete($_REQUEST['id']);
    echo json_encode($all_museums);
} else if ($_REQUEST['action'] === 'show'){
    $all_museums = Museums::show($_REQUEST['id']);
    echo json_encode($all_museums);
}
 ?>
