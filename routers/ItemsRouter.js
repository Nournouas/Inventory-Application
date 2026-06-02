const express = require("express")
const itemsRouter = express.Router();
const { getAllProducts, addProduct } = require("../controllers/itemController");

itemsRouter.get("/", getAllProducts);
itemsRouter.post("/", addProduct);

module.exports = {itemsRouter}