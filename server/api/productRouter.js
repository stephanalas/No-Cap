const express = require('express');

const {
  models: { Product },
} = require('../db/models/associations');

const productRouter = express.Router();

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});

module.exports = productRouter;
