const express = require("express")
const categoryRouter = express.Router();

categoryRouter.get("/", (req, res) => {
  res.render("categories", {title: "Categories"})
})

module.exports = {categoryRouter}