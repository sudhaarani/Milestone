DROP TABLE IF EXISTS timelines CASCADE;

CREATE TABLE timelines (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  image TEXT
);