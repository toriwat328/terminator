CREATE DATABASE terminator;

/c terminator

CREATE TABLE projects (id SERIAL, name TEXT, start VARCHAR(25), deadline VARCHAR(25), language TEXT);

INSERT INTO projects (name, start, deadline, language) VALUES ('Terminator', '12/13', '12/18', 'React');
INSERT INTO projects (name, start, deadline, language) VALUES ('Database', '12/13', '12/8', 'PHP/SQL');

CREATE TABLE issue (id SERIAL, title TEXT, description TEXT, projectid INT, dateFound TEXT, screenshot TEXT, isResolved BOOLEAN, solution TEXT);

INSERT INTO issue (title, description, projectid, dateFound, screenshot, isResolved, solution) VALUES ('SQL Bug', 'Database wont update', 2, '12/14', 'https://i.imgur.com/MXiZRI0.png', false, '');

INSERT INTO issue (title, description, projectid, dateFound, screenshot, isResolved, solution) VALUES ('SQL Bug Part 2', 'SQL is not working', 2, '12/17', 'https://i.imgur.com/MXiZRI0.png', false, '');

INSERT INTO issue (title, description, projectid, dateFound, screenshot, isResolved, solution) VALUES ('Terminator App React Bug', 'this.state is undefined', 1, '12/16', 'https://i.imgur.com/MXiZRI0.png', false, '');
