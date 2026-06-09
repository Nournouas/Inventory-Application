require("dotenv").config();
const helmet = require("helmet");
const path = require("node:path");
const express = require("express");
const app = express();
const { itemsRouter } = require("./routers/itemsRouter");
const { categoryRouter } = require("./routers/categoryRouter");

//helmet middleware
app.use(helmet());

//express public + form handling
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//ejs setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes
app.use("/categories", categoryRouter);
app.use("/products", itemsRouter);
app.get("/", (req, res) => {
  res.render("home", { title: "Home Page" });
});
app.use((req, res, next) => {
  res.status(404).render("error", { title: "error" });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", { title: "error page" });
});

//server
const server = app.listen(process.env.PORT, () => {
  console.log("running");
});

server.on("error", (err) => {
  console.error(err);
});
