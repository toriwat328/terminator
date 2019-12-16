<?php
include_once __DIR__ . '/issue.php';
$dbconn = null;
if(getenv('DATABASE_URL')){
    $connectionConfig = parse_url(getenv('DATABASE_URL'));
    $host = $connectionConfig['host'];
    $user = $connectionConfig['user'];
    $password = $connectionConfig['pass'];
    $port = $connectionConfig['port'];
    $dbname = trim($connectionConfig['path'],'/');
    $dbconn = pg_connect(
        "host=".$host." ".
        "user=".$user." ".
        "password=".$password." ".
        "port=".$port." ".
        "dbname=".$dbname
    );
} else {
    $dbconn = pg_connect("host=localhost dbname=terminator");
}
//setts up 2 classes
class Project { //will be able to be used over and over
    public $id;
    public $name;
    public $start;
    public $deadline;
    public $language;
    public function __construct($id, $name, $start, $deadline, $language){  //constructor that allows us to put in parameters  - optional
        $this->id = $id; //id is equal to the parameter and the public variable
        $this->name = $name;
        $this->start = $start;
        $this->deadline = $deadline;
        $this->language = $language;
        $this->project_issue_id = [];
    }
}
class Projects { //factory class - deal with all things updating, creating, deleting
    static function create($project){
        $query = "INSERT INTO projects (name, start, deadline, language) VALUES ($1, $2, $3, $4)"; //SQL statement
        $query_params = array($project->name, $project->start, $project->deadline, $project->language);
        pg_query_params($query, $query_params); //SQL statement and the parameters for the statement
        return self::all(); //sends back everything in the database
    }
    static function update($updated_project){
        $query = "UPDATE projects SET name = $1, start = $2, deadline = $3, language = $4 WHERE id = $5";
        $query_params = array($updated_project->name, $updated_project->start, $updated_project->deadline, $updated_project->language, $updated_project->id); //actually saved in the database
        pg_query_params($query, $query_params);
        return self::all();
    }
    static function delete($id){
        $query = "DELETE FROM projects WHERE id = $1";
        $query_params = array($id);
        pg_query_params($query, $query_params);
        return self::all();
    }
    static function show($project_id){
        $projects = array();
        $results = pg_query("SELECT projects.*, issue.id AS project_issue_id, issue.title, issue.description, issue.datefound, issue.screenshot, issue.isresolved, issue.solution FROM projects LEFT JOIN issue ON projects.id = issue.projectid WHERE projects.id = $project_id");
        $row_object = pg_fetch_object($results);
        $last_project_id = null;
        while($row_object){
            if($row_object->id !== $last_project_id){
                $new_project = new Project(
                    intval($row_object->id),
                    $row_object->name,
                    $row_object->start,
                    $row_object->deadline,
                    $row_object->language
                );
                    $projects[] = $new_project;
                    $last_project_id = $row_object->id;
                }
                    if($row_object->project_issue_id){
                        $new_issue = new Issue(
                            intval($row_object->project_issue_id),
                            $row_object->title,
                            $row_object->description,
                            $row_object->projectid,
                            $row_object->datefound,
                            $row_object->screenshot,
                            $row_object->isresolved,
                            $row_object->solution
                        );
                        $last_index_of_projects = count($projects)-1;
                        $most_recently_added_project = $projects[$last_index_of_projects];
                        $most_recently_added_project->project_issue_id[] = $new_issue;
                    }
                    $row_object = pg_fetch_object($results);
                }
        return $projects;
    }
    static function all(){
        $projects = array();

        $results = pg_query("SELECT projects.*, issue.id AS project_issue_id, issue.title, issue.description, issue.projectid, issue.datefound, issue.screenshot, issue.isresolved, issue.solution FROM projects LEFT JOIN issue ON projects.id = issue.projectid ORDER BY projects.id;");

        $row_object = pg_fetch_object($results);

        $last_project_id = null;

        while($row_object){
            if($row_object->id !== $last_project_id){
                $new_project = new Project(
                    intval($row_object->id),
                    $row_object->name,
                    $row_object->start,
                    $row_object->deadline,
                    $row_object->language
                );

                    $projects[] = $new_project;
                    $last_project_id = $row_object->id;
                }
                    if($row_object->project_issue_id){
                        $new_issue = new Issue(
                            intval($row_object->project_issue_id),
                            $row_object->title,
                            $row_object->description,
                            $row_object->projectid,
                            $row_object->datefound,
                            $row_object->screenshot,
                            $row_object->isresolved,
                            $row_object->solution
                        );
                        $last_index_of_projects = count($projects)-1;
                        $most_recently_added_project = $projects[$last_index_of_projects];
                        $most_recently_added_project->project_issue_id[] = $new_issue;
                    }
                    $row_object = pg_fetch_object($results);
                }
        return $projects;
    }
};
 ?>
