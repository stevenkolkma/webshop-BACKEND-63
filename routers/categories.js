const express = require("express");
const { Router } = express;
const Product = require("../models").Product;
const Category = require("../models").Category;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allCategories = await Category.findAll();
    res.status(200).send(allCategories);
  } catch (e) {
    console.log(e.message);
  }
});
router.get("/:categoryId/products", async (req, res, next) => {
  try {
    const productByCategoryId = await Category.findAll({ include: [Product] });
    res.status(200).send(productByCategoryId);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
