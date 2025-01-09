import express from "express";

// Basic server setup for client HTTP requests.
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Success!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});