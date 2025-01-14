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
const port = 4001;

app.use(bodyParser.json());

app.get("/users/:id", async (req, res) => {
   try {
    const response = await db.query(
        `SELECT name, about FROM users
         WHERE id = $1`,
        [req.params.id],
    );

    if (response.rowCount > 0) {
        res.json(response.rows[0]);
    } else {
        res.status(404).end();
    };
   } catch (err) {
    res.status(404).end();
   };
});

app.post("/users/new", async (req, res) => {
    try {
        const response = await db.query(
            `INSERT INTO users (name, about)
             VALUES ($1, $2) RETURNING id`,
            ["olames", "this is the about me also"],
        );

        await db.query(
            `INSERT INTO user_authentications (user_id, email, password)
             VALUES ($1, $2, $3)`,
            [response.rows[0].id, req.body.email, req.body.password],
        );
    } catch (err) {
        res.status(404).end();
    };
});

app.post("/users/authenticate", async (req, res) => {
    console.log("Test: " + JSON.stringify(req.body));
    try {
        const response = await db.query(
            `SELECT user_id FROM user_authentications
             WHERE email = $1 and password = $2`,
            [req.body.email, req.body.password]
        );

        if (response.rowCount > 0) {
            res.json(response.rows[0]);
        } else {
            res.status(403).end();
        };
    } catch (err) {
        res.statusCode(404).end();
    }
});

app.listen(port, () => {
    console.log(`Users Private API running on port ${port}.`);
});