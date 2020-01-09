DROP DATABASE IF EXISTS album_ranker;
CREATE DATABASE album_ranker;

-- CREATE DATABASE album_Ranker;
-- USE album_Ranker;

-- DROP TABLE albums;
-- CREATE TABLE albums (
-- id int auto_increment not null,
-- artist_name varchar(100) not null,
-- album_name varchar(100) not null,
-- dynamicsScore int,
-- uniquenessScore int,
-- productionScore int,
-- musicianshipScore int,
-- dynamics int,
-- uniqueness int,
-- production int,
-- musicianship int,
-- primary key(id)
-- );

-- DROP TABLE scores;
-- CREATE TABLE scores (
-- id int auto_increment not null,
-- final_score int,
-- album_id int,
-- primary key(id),
-- foreign key (album_id) references albums (id)
-- );