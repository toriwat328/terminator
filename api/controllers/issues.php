<?php
header('Content_Type: application/json'); //sending back json
include_once __DIR__ . '/../models/issue.php'; //include what is in the models directory up out the controllers dir and into models
if($_REQUEST['action'] === 'index'){  //take a look at the (req.query or params) created an action query parameter with a value of index. if the action property = index then run the echo to send back json People::all (which basically returns the array)
    echo json_encode(Issues::all());
} else if($_REQUEST['action'] === 'create'){
    $request_body = file_get_contents('php://input');

    $body_object = json_decode($request_body);

    $new_issue = new Issue(null, $body_object->title, $body_object->description, $body_object->projectid, $body_object->datefound, $body_object->screenshot, $body_object->isresolved, $body_object->solution);

    // echo json_encode($new_issue);

    $all_issues = Issues::create($new_issue);
    echo json_encode($all_issues);
} else if ($_REQUEST['action'] === 'update'){
    $request_body = file_get_contents('php://input');

    $body_object = json_decode($request_body);

    // echo json_encode($body_object);

    $updated_issue = new Issue($_REQUEST['id'], $body_object->title, $body_object->description, $body_object->projectid, $body_object->datefound, $body_object->screenshot, $body_object->isresolved, $body_object->solution); //just holding data
    $all_issues = Issues::update($updated_issue);
    echo json_encode($all_issues);
} else if ($_REQUEST['action'] === 'delete'){
    $all_issues = Issues::delete($_REQUEST['id']);
    echo json_encode($all_issues);
} else if ($_REQUEST['action'] === 'show'){
    $all_issues = Issues::show($_REQUEST['id']);
    echo json_encode($all_issues);
}
 ?>
