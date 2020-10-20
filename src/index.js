const express = require("express");
const path = require("path");

require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const app = express();
const port =
  env === "development" ? process.env.DEV_PORT : process.env.PROD_PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.render("home", { activeRoute: req.originalUrl });
});

app.get("/profile", (req, res) => {
  res.render("profile", { activeRoute: req.originalUrl });
});

app.get("/external-api", (req, res) => {
  res.render("external-api", { activeRoute: req.originalUrl });
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
