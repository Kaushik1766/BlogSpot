import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/", (req, res) => res.render('./index.html'));

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));