import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// Basic server setup for client HTTP requests.
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", "./server/views");

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/books/:name", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:4002/books/" + req.params.name);

        res.json(response.data);
    } catch (err) {
        res.status(404).end();
    };
});

app.post("/", async (req, res) => {
    try {
        const userId = (await axios.post(
            "http://localhost:4001/users/authenticate",
            {
                email: req.body.email,
                password: req.body.password,
            }
        )).data.user_id;

        const userInfo = await axios.get(
            "http://localhost:4001/users/" + userId);
    } catch (err) {
        console.log("Authentication failed");
        // User Authentication Failed
        res.status(404).end();
    };
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});