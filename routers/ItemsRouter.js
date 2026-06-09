const express = require("express");
const itemsRouter = express.Router();
const {
  getAllProducts,
  addProduct,
  deleteProduct,
  editProduct,
  updateProduct
} = require("../controllers/itemController");

itemsRouter.get("/", getAllProducts);
itemsRouter.post("/", addProduct);
itemsRouter.post("/delete", deleteProduct);
itemsRouter.get("/:product/edit", editProduct);
itemsRouter.post("/:product/edit", updateProduct);

module.exports = { itemsRouter };
