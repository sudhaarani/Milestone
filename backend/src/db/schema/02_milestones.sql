DROP TABLE IF EXISTS milestones CASCADE;

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
