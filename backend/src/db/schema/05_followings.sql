DROP TABLE IF EXISTS followings CASCADE;

CREATE TABLE "followings" (
  id SERIAL PRIMARY KEY NOT NULL,
  user1_id INTEGER REFERENCES users(id), /* user1 is the one clicking 'follow' */
  user2_id INTEGER REFERENCES users(id) /* user2 is who is being followed */
);