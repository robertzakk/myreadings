import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// Basic server setup for client HTTP requests.
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login.ejs");
});

app.post("/", async (req, res) => {
    try {
        const response = await axios.post("http://localhost:4001/users/new", {
            email: req.body.email,
            password: req.body.password,
        });
    } catch (err) {
        res.status(404).end();
        console.log(err);
    };
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});