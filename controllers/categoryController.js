const pool = require("../database/pool");
const {
  getAllProductsQuery,
  getAllCategoriesQuery,
  addCategoryQuery,
  deleteProductOnCategoryQuery,
  deleteCategoryQuery,
  getCategoryByIDQuery,
  updateCategoryQuery,
} = require("../database/queries");
const { body, matchedData, validationResult } = require("express-validator");

const validateAddCategory = [
  body("categoryName")
    .trim()
    .isAlphanumeric("en-GB", { ignore: " " })
    .withMessage("Category name must only contain alphabetical letters")
    .isLength({ min: 1, max: 255 })
    .withMessage("Category name mustn't exceed 255 characters"),
  body("categoryTotal").trim().isNumeric(),
];

const validateDeleteCategory = [
  body("deleteId").trim().isNumeric().withMessage("Category not recognised"),
];

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await pool.query(getAllCategoriesQuery);
    res.render("categories", {
      title: "Categories",
      categories: categories.rows,
    });
  } catch (err) {
    next(err);
  }
};

const addCategory = [
  validateAddCategory,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).redirect("/categories");
    }
    const { categoryName, categoryTotal } = matchedData(req);
    const values = [categoryName, categoryTotal];
    try {
      await pool.query(addCategoryQuery, values);
      res.redirect("/categories");
    } catch (err) {
      next(err);
    }
  },
];

const deleteCategory = [
  validateDeleteCategory,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).redirect("/categories");
    }
    const { deleteId } = matchedData(req);
    const values = [deleteId];
    try {
      await pool.query(deleteProductOnCategoryQuery, values);
      await pool.query(deleteCategoryQuery, values);
      res.redirect("/categories");
    } catch (err) {
      next(err);
    }
  },
];

const editCategory = async (req, res) => {
  const categoryId = req.params;
  const category = await pool.query(getCategoryByIDQuery, [categoryId.category]);
  res.render("categoriesEdit", {title: "category Edit", category: category.rows[0]})
}

const updateCategory = [
  validateAddCategory,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).redirect("/categories");
    }
    const { categoryName, categoryTotal } = matchedData(req);
    const values = [categoryName, categoryTotal, req.params.category];
    try {
      await pool.query(updateCategoryQuery, values);
      res.redirect("/categories");
    } catch (err) {
      next(err);
    }
  },
];



module.exports = {
  getAllCategories,
  deleteCategory,
  addCategory,
  editCategory,
  updateCategory
};
