DROP TABLE IF EXISTS timelines CASCADE;

CREATE TABLE "timelines" (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT
);
