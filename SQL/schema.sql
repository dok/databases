DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id INTEGER(10),
  description VARCHAR(255),
  user INTEGER(10),
  roomname VARCHAR(255),
  createdat DATE
);

-- CREATE TABLE users (
--   /* Describe your table here.*/
-- );

-- CREATE TABLE rooms (
--   /* Describe your table here.*/
-- );


/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
