require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();
const { homeRouter } = require("./routers/homeRouter")
const { itemsRouter } = require("./routers/itemsRouter")
const { categoryRouter } = require("./routers/categoryRouter")

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

app.use("/", homeRouter);
app.use("/categories", categoryRouter);
app.use("/products", itemsRouter);

app.listen(process.env.PORT, (err) => {
  if (err) throw err

  console.log("running")
})