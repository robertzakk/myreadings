import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs";
import multer from "multer";

// Basic server setup for client HTTP requests.
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().single("profile-picture"));
app.use(express.static("public"));

app.set("views", "./server/views");

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

// WEBPAGE REQUESTS
app.get("/", (req, res) => {
    res.render("login.ejs");
});

app.get("/signup", (req, res) => {
    res.render("login.ejs", { signup: true });
});

app.get("/users/:id", (req, res) => {
    console.log(`Redirected to user profile with id: ${req.params.id}`);
    res.render("index.ejs");
});

// JSON REQUESTS THROUGH PRIVATE APIS
app.get("/api/books/:name", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:4002/books/" + req.params.name);

        res.json(response.data);
    } catch (err) {
        res.status(404).end();
    };
});

app.get("/api/users/:username", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:4001/users/" + req.params.username);

        for (let row of response.data) {
            row.profileImageBuffer = fs.readFileSync(row.file_path).toString("base64"); 
        };

        res.json(response.data);
    } catch (err) {
        console.log(err);
        res.status(404).end();
    };
});

app.post("/api/users", async (req, res) => {
    try {
        console.log(req.file);

        const userId = (await axios.post(
            "http://localhost:4001/users",
            {
                profileImageBuffer: req.file.buffer,
                profileImageType: req.file.mimetype.match("image/(.*)")[1],

                username: req.body.username,
                about: req.body.about,

                email: req.body.email,
                password: req.body.password,
            }
        )).data.id;

        res.redirect(`http://localhost:${port}/users/` + userId);
    } catch (err) {
        console.log(err);
        res.status(404).end();
    };
});