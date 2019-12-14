<?php
header('Content_Type: application/json');

include_once __DIR__ . '/../models/project.php';

if($_REQUEST['action'] === 'index'){

    echo json_encode(Projects::all());

} else if($_REQUEST['action'] === 'create'){ //APPROVED
     // echo '{"test":true}'; // Test
    $request_body = file_get_contents('php://input'); //this line is the user input (request_body = userinput)

    // echo $request_body;

    $body_object = json_decode($request_body); //decode json with a string

    $new_project = new Project(null, $body_object->name, $body_object->start, $body_object->deadline, $body_object->language);

    // echo json_encode($new_project);

    $all_projects = Projects::create($new_project);

    echo json_encode($all_projects);
} else if ($_REQUEST['action'] === 'update'){

    $request_body = file_get_contents('php://input'); //just returns the user input

    $body_object = json_decode($request_body);

    $updated_project = new Project($_REQUEST['id'], $body_object->name, $body_object->start, $body_object->deadline, $body_object->language);

    // echo json_encode($updated_project);

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
