// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  max: 20
};

const db = new Pool(dbParams);

db.connect().catch(e => console.log(`Error connecting to Postgres server:\n${e}`));;

module.exports = db;
