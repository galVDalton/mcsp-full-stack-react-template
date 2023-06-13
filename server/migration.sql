DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS favorites;

CREATE TABLE tasks (
  id SERIAL,
  description TEXT
);

INSERT INTO tasks(description) VALUES('Do the dishes');
INSERT INTO tasks(description) VALUES('Walk the dog');
INSERT INTO tasks(description) VALUES('Sweep the floor');
INSERT INTO tasks(description) VALUES('Do your homework');
INSERT INTO tasks(description) VALUES('Beat Elden Ring');

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS favorites;

CREATE TABLE user (
  user_id SERIAL,
  username TEXT,
  firstname TEXT,
  lastname TEXT,
  lastloggedin date
);

CREATE TABLE favorites (
  user_id INTEGER,
  recipe_id INTEGER
);

INSERT INTO user(username, firstname, lastname, lastloggedin) 
VALUES('daltonandrews', 'dalton', 'andrews', NOW());

INSERT INTO favorites(user_id, recipe_id) VALUES(1, 12);

