const express = require('express');

const {
  models: { Product, Review, User },
} = require('../db/models/associations');

const productRouter = express.Router();

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Review,
        include: {
          model: User,
        },
      },
      order: [[{ model: Review }, 'id', 'DESC']],
    });
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});

productRouter.post('/', async (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!req.body) res.sendStatus(400);
    const newProduct = await Product.create({ name, price });
    res.status(201).send(newProduct);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({
      include: {
        model: Review,
        include: {
          model: User,
        },
      },
      where: {
        id: productId,
      },
    });
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

productRouter.put('/:id', async (req, res, next) => {
  if (!req.body) {
    res.sendStatus(400);
  }
  // will need to update this with appropriate fields
  const { name, price } = req.body;

  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    const updatedProduct = await product.update({ name, price });

    res.status(200).send(updatedProduct);
  } catch (ex) {
    next(ex);
  }
});

productRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    await product.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = productRouter;
