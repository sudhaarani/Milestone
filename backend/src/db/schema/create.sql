DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS milestones CASCADE;
DROP TABLE IF EXISTS timelines CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS followings CASCADE;


CREATE TABLE "users" (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


CREATE TABLE timelines (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  image TEXT
);


CREATE TABLE "milestones" (
  id SERIAL PRIMARY KEY NOT NULL,
  timeline_id INTEGER REFERENCES timelines(id),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  diary_entry TEXT,
  image1 TEXT,
  image2 TEXT,
  image3 TEXT,
  image4 TEXT
);


CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  milestone_id INTEGER REFERENCES milestones(id)
);


CREATE TABLE "followings" (
  id SERIAL PRIMARY KEY NOT NULL,
  user1_id INTEGER REFERENCES users(id), /* user1 is the one clicking 'follow' */
  user2_id INTEGER REFERENCES users(id) /* user2 is who is being followed */
);