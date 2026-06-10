const express = require("express");
const categoryRouter = express.Router();
const {
  getAllCategories,
  deleteCategory,
  addCategory,
  editCategory,
  updateCategory,
} = require("../controllers/categoryController");

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", addCategory);
categoryRouter.post("/delete", deleteCategory);
categoryRouter.get("/:category/edit", editCategory);
categoryRouter.post("/:category/edit", updateCategory);

module.exports = { categoryRouter };
