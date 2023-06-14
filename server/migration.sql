DROP TABLE IF EXISTS visitorLog;

CREATE TABLE visitorLog (
  visitor_id SERIAL,
  firstname TEXT,
  lastname TEXT,
  visiteddate date
);


INSERT INTO visitorLog( firstname, lastname, visiteddate) 
VALUES('dalton', 'andrews', NOW());



