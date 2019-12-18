# Terminator


## https://bug-terminator.herokuapp.com/


### Languages/Technologies/Methodologies Used In Creating This App:
React, JavaScript, JSX, Heroku, PHP, PostgresQL, MAMP, CSS, 7 RESTFUL routes, MVC


### About
The terminator app is a app that organizes projects and tracks the issues for the bugs related to specific projects.  


### Terminator - USER STORIES 
##### Project
* Users should be able to:
  * Create a new project 
  * View all of their projects 
  * Edit an existing project 
  * Delete an existing project

##### Issues(Bugs) 
* Users should be able to:
  * Within the project details view, create a new bug issue
  * View all bug issues related to a specific project 
  * Edit an existing bug issue from a project
  * Delete an existing bug issue from a project
  

### Back-End Overview
* The back-end was built using PHP to create API routes using Postgres as the database. The data was structured specifically with the user stories in mind to have the issues model nested within the project model where the project's id is joined at the issues' projectid property. Postman was used extensively to test each CRUD route to ensure that data would be pulled into the React app correctly. 


### Front-End Overview
    

  
### Struggles:

* Getting form to work to update issue model. Since the issue model is nested within the project model, it was hard to access.
* Getting individual projects to show. In order to solve this, I have to use another callback function within fetch function so that the view changes to the individual project view after the state is set to the individual project json data that was fetched.
* Through debugging PHP when a few properties were coming up null after new data was returned from API, I got a better understanding of what each line was doing. I console.log'd each step to catch small errors while using Postman.
  
  
### What I Would Like To Add:
* Add user model and a login so that users can have their own profile and create their own projects and issues. 
* When a user creates an issue to record a bug, I would like to have the project.id already autofilled to the project that it corresponses to so that a user would not have to hard code it. 

