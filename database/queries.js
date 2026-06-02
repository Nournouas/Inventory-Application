const getAllProductsQuery = 
  `SELECT productName, categoryName 
  FROM products
  INNER JOIN categories
  ON products.categoryID = categories.id`

const getAllCategoriesQuery = 
  `SELECT id, categoryName 
  FROM categories`


  module.exports = {
    getAllProductsQuery,
    getAllCategoriesQuery
  }