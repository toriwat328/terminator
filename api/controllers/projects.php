<?php
header('Content_Type: application/json'); //sending back json
include_once __DIR__ . '/../models/project.php'; //include what is in the models directory up out the controllers dir and into models
if($_REQUEST['action'] === 'index'){  //take a look at the (req.query or params) created an action query parameter with a value of index. if the action property = index then run the echo to send back json People::all (which basically returns the array)
    echo json_encode(Projects::all());
} else if($_REQUEST['action'] === 'create'){
     // echo '{"test":true}'; // Test
    $request_body = file_get_contents('php://input'); //this line is the user input (request_body = userinput)

    $body_object = json_decode($request_body); //decode json with a string

    $new_project = new Project(null, $body_object->name, $body_object->start, $body_object->deadline, $body_object->language);

    $all_projects = Projects::create($new_project);
    echo json_encode($all_projects);
} else if ($_REQUEST['action'] === 'update'){
    $request_body = file_get_contents('php://input');
    $body_object = json_decode($request_body);
    $updated_project = new Project($_REQUEST['id'], $body_object->name, $body_object->start, $body_object->deadline, $body_object->language); //just holding data
    $all_projects = Projects::update($updated_project);
    echo json_encode($all_projects);
} else if ($_REQUEST['action'] === 'delete'){
    $all_projects = Projects::delete($_REQUEST['id']);
    echo json_encode($all_projects);
} else if ($_REQUEST['action'] === 'show'){
    $all_projects = Projects::show($_REQUEST['id']);
    echo json_encode($all_projects);
}
 ?>
