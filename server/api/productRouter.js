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

productRouter.get('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = productRouter;
