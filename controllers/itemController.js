const pool = require("../database/pool");
const {
  getAllProductsQuery,
  getAllCategoriesQuery,
  addProductQuery,
  matchingCategoryIDQuery,
  deleteProductQuery,
  getProductByIDQuery,
  updateProductQuery
} = require("../database/queries");
const { body, matchedData, validationResult } = require("express-validator");

//Validate Template
const validateAddProduct = [
  body("productName")
    .trim()
    .isAlphanumeric("en-GB", { ignore: " " })
    .withMessage("Product name must only contain alphabetical letters")
    .isLength({ min: 1, max: 255 })
    .withMessage("Product name mustn't exceed 255 characters"),
  body("categoryId").trim().isNumeric().withMessage("category not recognised"),
  body("productSKU").trim().isAlphanumeric(),
  body("productPrice").trim().isNumeric(),
  body("productStock").trim().isNumeric(),
  body("productCapacity").trim().isNumeric(),
];

const validateDeleteProduct = [
  body("deleteId").trim().isNumeric().withMessage("Product not recognised"),
];

// Get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await pool.query(getAllProductsQuery);
    const categories = await pool.query(getAllCategoriesQuery);
    res.render("items", {
      title: "Products",
      products: products.rows,
      categories: categories.rows,
    });
  } catch (err) {
    next(err);
  }
};

// Add product
const addProduct = [
  validateAddProduct,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).redirect("/products");
    }
    const {
      productName,
      categoryId,
      productSKU,
      productPrice,
      productStock,
      productCapacity,
    } = matchedData(req);
    const values = [
      productName,
      productSKU,
      productPrice,
      productStock,
      productCapacity,
      categoryId,
    ];
    try {
      await pool.query(addProductQuery, values);
      res.redirect("/products");
    } catch (err) {
      next(err);
    }
  },
];

const deleteProduct = [
  validateDeleteProduct,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).redirect("/products");
    }
    const { deleteId } = matchedData(req);
    const values = [deleteId];
    try {
      let categoryID = await pool.query(matchingCategoryIDQuery, values);
      categoryID = categoryID.rows[0].categoryid;
      await pool.query(deleteProductQuery, values);
      res.redirect("/products");
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

const editProduct = async (req, res) => {
  const productId = req.params;
  const product = await pool.query(getProductByIDQuery, [productId.product]);
  const categories = await pool.query(getAllCategoriesQuery);
  res.render("itemsEdit", {title: "product Edit", categories: categories.rows , product: product.rows[0]})
}

const updateProduct2 = [
  validateAddProduct,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).redirect("/products");
    }
    const {
      productName,
      categoryId,
      productSKU,
      productPrice,
      productStock,
      productCapacity,
    } = matchedData(req);
    const values = [
      productName,
      productSKU,
      productPrice,
      productStock,
      productCapacity,
      categoryId,
      req.params.product
    ];
    try {
      await pool.query(updateProductQuery, values);
      res.redirect("/products");
    } catch (err) {
      next(err);
    }
  },
];

const updateProduct = async (req, res, next) => {
    console.log(req.body)
    redirect("/")
  }


module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
  editProduct,
  updateProduct
};
