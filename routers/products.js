const express = require("express");
const { Router } = express;
const Product = require("../models").Product;
const Categories = require("../models").Category;
const { Op } = require("sequelize");

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
    const filter = {}
    if(category && category.length > 0){
      filter.categoryId = {
        [Op.in]: category
      }
    }
    if(rating && rating.length > 0){
     filter.rating = {
      [Op.in]:rating
     }
    }
    if(price){
     filter.price = price
    }

    const products = await Product.findAll({
      where: filter,
    });

    res.json(products);
  } catch (e) {
    console.log(e);
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
