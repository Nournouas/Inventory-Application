const pool = require("../database/pool")
const { getAllProductsQuery, getAllCategoriesQuery } = require("../database/queries")

const getAllProducts = async (req, res) => {
  const products = await pool.query(getAllProductsQuery)
  const categories = await pool.query(getAllCategoriesQuery)
  res.render("items", {title: "Products", products: products.rows, categories: categories.rows})
}

const addProduct = async (req, res) => {
  await pool.query(`INSERT INTO products(productName, categoryID) VALUES('${req.body.productName}','${req.body.categoryId}');`)
  const products = await pool.query(getAllProductsQuery)
  const categories = await pool.query(getAllCategoriesQuery)
  res.render("items", {title: "Products", products: products.rows, categories: categories.rows})
}

module.exports = {
  getAllProducts,
  addProduct
}