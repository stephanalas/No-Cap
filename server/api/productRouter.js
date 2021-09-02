const express = require('express');
const requireToken = require('../requireToken');
const {
  models: { Product, Review, User },
} = require('../db/models/associations');
const { Op } = require('sequelize');
const productRouter = express.Router();

productRouter.get('/', requireToken, async (req, res, next) => {
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

productRouter.post('/', requireToken, async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === 'Admin') {
      const { name, price } = req.body;
      if (!req.body) res.sendStatus(400);
      const newProduct = await Product.create({ name, price });
      res.status(201).send(newProduct);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

productRouter.get('/:id', requireToken, async (req, res, next) => {
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

productRouter.put('/:id', requireToken, async (req, res, next) => {
  if (!req.body) {
    res.sendStatus(400);
  }
  const { role } = req.user;
  if (role === 'Admin') {
    const { name, price } = req.body;

    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      const updatedProduct = await product.update({ name, price });

      res.status(200).send(updatedProduct);
    } catch (ex) {
      next(ex);
    }
  } else {
    res.sendStatus(403);
  }
});

productRouter.delete('/:id', requireToken, async (req, res, next) => {
  const { role } = req.user;
  if (role === 'Admin') {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      await product.destroy();
      res.sendStatus(204);
    } catch (ex) {
      next(ex);
    }
  } else {
    res.sendStatus(403);
  }
});
productRouter.post('/sorted', async (req, res, next) => {
  try {
    const { sortBy } = req.body;
    const index = sortBy.indexOf('-');
    let column = sortBy.slice(index + 1);
    const sort = sortBy.slice(0, index);
    let products;
    let order;
    console.log(column);
    console.log(sort);
    if (sort === 'highest' && column === 'rating') {
      order = [['rating', 'DESC']];
    } else if (sort === 'highest' && column === 'price') {
      order = [['price', 'DESC']];
    } else if (sort === 'lowest' && column === 'price') {
      order = [['price', 'ASC']];
    } else if (sort === 'most') {
      order = [['reviewCount', 'DESC']];
    }
    res.send(
      await Product.findAll({
        order,
        include: [Review],
      })
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
});
productRouter.post('/filtered', async (req, res, next) => {
  try {
    const { filterOptions } = req.body;
    console.log(req.body);
    const queryParams = {};
    for (const key in filterOptions) {
      if (filterOptions[key].length) {
        if (key === 'category' || key === 'color') {
          queryParams[key] = {
            [Op.in]: filterOptions[key],
          };
        } else if (key === 'rating') {
          queryParams[key] = {
            [Op.gte]: Math.min(...filterOptions[key]),
          };
        }
      }

      // the columns would represent the keys in the object. using Op check to see if attribute is in array or less than or equal to rating. must be a conditional
    }
    console.log(queryParams);
    const products = await Product.findAll({
      where: queryParams,
    });
    console.log(products);
    res.send(products);
  } catch (error) {
    console.log(error);
  }
});

module.exports = productRouter;
