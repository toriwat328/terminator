<?php
include_once __DIR__ . '/project.php';
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
class Issue { //will be able to be used over and over
    public $id;
    public $title;
    public $description;
    public $projectid;
    public $datefound;
    public $screenshot;
    public $isresolved;
    public $solution;

    public function __construct($id, $title, $description, $projectid, $datefound, $screenshot, $isresolved, $solution){  //constructor that allows us to put in parameters  - optional
        $this->id = $id; //id is equal to the parameter and the public variable
        $this->title = $title;
        $this->description = $description;
        $this->projectid = $projectid;
        $this->datefound = $datefound;
        $this->screenshot = $screenshot;
        $this->isresolved = $isresolved;
        $this->solution = $solution;

    }
}
class Issues { //factory class - deal with all things updating, creating, deleting
    static function create($issue){
        $query = "INSERT INTO issue (title, description, projectid, datefound, screenshot, isresolved, solution) VALUES ($1, $2, $3, $4, $5, $6, $7);"; //SQL statement
        $query_params = array($issue->title, $issue->description, $issue->projectid, $issue->datefound, $issue->screenshot, $issue->isresolved, $issue->solution);
        pg_query_params($query, $query_params);

        return self::all(); //sends back everything in the database
    }
    static function update($updated_issue){
        $query = "UPDATE issue SET title = $1, description = $2, projectid = $3, datefound = $4, screenshot = $5, isresolved = $6, solution = $7 WHERE id = $8";
        $query_params = array($updated_issue->title, $updated_issue->description, $updated_issue->projectid, $updated_issue->datefound, $updated_issue->screenshot, $updated_issue->isresolved, $updated_issue->solution, $updated_issue->id);
        pg_query_params($query, $query_params);
        return self::all();
    }
    static function delete($id){
        $query = "DELETE FROM issue WHERE id = $1";
        $query_params = array($id);
        pg_query_params($query, $query_params);
        return self::all();
    }
    static function show($issue){
        $issues = array();
               $results = pg_query("SELECT issue.*, projects.id AS task_id, projects.name, projects.start, projects.deadline, projects.language FROM issue JOIN projects ON issue.projectid = projects.id WHERE issue.id = $issue ORDER BY issue.id;");
               $row_object = pg_fetch_object($results);
                           $new_issue = new Issue(
                               intval($row_object->id),
                               $row_object->title,
                               $row_object->description,
                               $row_object->projectid,
                               $row_object->datefound,
                               $row_object->screenshot,
                                $row_object->isresolved,
                                 $row_object->solution


                           );
                           if($row_object->projectid){
                               $new_project = new Project(
                                   intval($row_object->task_id),
                                   $row_object->name,
                                   $row_object->start,
                                   $row_object->deadline,
                                   $row_object->language
                           );
                            $new_issue->project = $new_project;
                        }
                           $issues[] = $new_issue;
                           $row_object = pg_fetch_object($results);
               return $issues;
           }
    static function all(){ //on function that gets everything
        $arts = array(); //mimcks database pushes new persons into $people array and returns the array
        // $person1 = new Person(1,'Bob', 31); //created new person with parameters for constructor
        // $person2 = new Person(2,'Bab', 32);
        // $person3 = new Person(3,'Beb', 33);
        //
        // $people[] = $person1;
        // $people[] = $person2;
        // $people[] = $person3;
        $results = pg_query("SELECT
                                issue.*,
                                projects.id AS task_id,
                                projects.name,
                                projects.start,
                                projects.deadline,
                                projects.language
                            FROM issue
                            LEFT JOIN projects
                                ON issue.projectid = projects.id"); //pg returns the dataset that you cant look at


                        $row_object = pg_fetch_object($results);


                        while($row_object){
                            $new_issue = new Issue(
                                intval($row_object->id),
                                $row_object->title,
                                $row_object->description,
                                $row_object->projectid,
                                $row_object->datefound,
                                $row_object->screenshot,
                                 $row_object->isresolved,
                                  $row_object->solution,


                            );
                            if($row_object->projectid){
                                $new_project = new Project(
                                    intval($row_object->task_id),
                                    $row_object->name,
                                    $row_object->start,
                                    $row_object->deadline,
                                    $row_object->language
                            );
                             $new_issue->project = $new_project;
                         }
                            $issues[] = $new_issue;
                            $row_object = pg_fetch_object($results);
                        }

                return $issues;
    }
}
 ?>
