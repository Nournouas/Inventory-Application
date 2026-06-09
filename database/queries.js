const getAllProductsQuery = `SELECT productName, categoryName, products.id AS productID, SKU, price, stock, capacity
  FROM products
  INNER JOIN categories
  ON products.categoryID = categories.id`;

const getAllCategoriesQuery = `SELECT categories.id, categoryName, COUNT(products.id) AS numberOfProducts, total
FROM categories
LEFT JOIN products ON products.categoryID = categories.id
GROUP BY categories.id
ORDER BY categories.id`;

const getCategoryByIDQuery = `SELECT id, categoryName, total
FROM categories
WHERE id = $1;`

const getProductByIDQuery = `SELECT productName, categoryName, products.id AS productID, SKU, price, stock, capacity
  FROM products
  INNER JOIN categories
  ON products.categoryID = categories.id
  WHERE products.id = $1;`


const updateCategoryQuery = `UPDATE categories
SET categoryName = $1, total = $2
WHERE id = $3;`

const updateProductQuery = `UPDATE products
SET productName = $1, categoryName, products.id AS productID, SKU, price, stock, capacity
WHER id = $7`

const addProductQuery = `INSERT INTO products(productName, SKU, price, stock, capacity, categoryID) 
VALUES($1,$2,$3,$4,$5,$6);`

const matchingCategoryIDQuery = `SELECT categoryID FROM products WHERE id = $1`

const deleteProductQuery = `DELETE FROM products WHERE id = $1;`

const addCategoryQuery = `INSERT INTO categories(categoryname, numberOfProducts, total) VALUES($1, 0 ,$2);`

const deleteProductOnCategoryQuery = `DELETE FROM products WHERE categoryid = $1;`

const deleteCategoryQuery = `DELETE FROM categories WHERE id = $1;`


module.exports = {
  getAllProductsQuery,
  getAllCategoriesQuery,
  addProductQuery,
  matchingCategoryIDQuery,
  deleteProductQuery,
  addCategoryQuery,
  deleteProductOnCategoryQuery,
  deleteCategoryQuery,
  getCategoryByIDQuery,
  updateCategoryQuery,
  getProductByIDQuery
};
