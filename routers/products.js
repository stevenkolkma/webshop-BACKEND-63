const express = require("express");
const { Router } = express;
const Product = require("../models");
const Category = require("../models");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.status(200).send(allProducts);
  } catch (e) {
    console.log(e);
  }
});
