import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
    database: "my_readings",
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Xen^U.N/p<4!8)fL"
});

db.connect();

const app = express();
const port = 4002;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Books Private API running on port ${port}.`);
});