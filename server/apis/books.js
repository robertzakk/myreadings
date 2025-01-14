import express from "express";
import axios from "axios";
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

app.get("/books/:name", async (req, res) => {
    try {
        const response = await axios.get(
            "https://openlibrary.org/search.json",
            {
                params: {
                    q: req.params.name,
                    limit: 4,
                    page: 1,
                },
            }
        );

        res.json(response.data);
    } catch (err) {
        console.log(err);
        res.status(404).end();
    };
});

app.listen(port, () => {
    console.log(`Books Private API running on port ${port}.`);
});