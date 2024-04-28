# Milestone API

## Setup

Install dependencies with `npm install`.

## Creating The DB

Use the `psql -U labber` command to login to the PostgreSQL server with the username `labber` and the password `labber`. This command **MUST** be run in a vagrant terminal, we are using the PostgreSQL installation provided in the vagrant environment. M1/M2 and WSL2 users can execute this command in their terminal.

Create a database with the command `CREATE DATABASE final;`.

Copy the `.env.example` file to `.env` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=labber
PGDATABASE=final
PGPASSWORD=labber
PGPORT=5432
```

## Seeding

Run the development server with `npm start` in the Host environment.

## Reset the database

Reset the database using command

```sh
npm run reset
```

## Run The Server

Running the server normally

```sh
npm start
```
