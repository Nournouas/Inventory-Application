require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

app.get("/" , (req, res) => {
  res.send("hello")
})

app.listen(process.env.PORT, (err) => {
  if (err) throw err

  console.log("running")
})