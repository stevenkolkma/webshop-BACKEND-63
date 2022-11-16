const express = require("express");
const { Router } = express;
const Product = require("../models").Product;
const Categories = require("../models").Category;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.status(200).send(allProducts);
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { category, rating, price } = req.body;

    // if (!category) {
    //   const categori1 = await Categories.findAll();

    //   return categori1;
    // } else {
    //   const categori1 = category;

    // }

    const products = await Product.findAll({
      where: { categoryId: category, rating: rating, price: price },
    });

    res.json(products);
    // console.log('products');
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).send("Product with that id does not exist");
    }
    res.status(200).send(product);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
