const express = require('express');

const {
  models: { User, Order },
} = require('../db/models/associations');
const CartLineItem = require('../db/models/CartLineItem');
const OrderLineItem = require('../db/models/OrderLineItem');

const orderRouter = express.Router();

orderRouter.get('/', async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(400);

    const orders = await Order.findAll();
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

orderRouter.get('/:id', async (req, res, next) => {
    try {
        const {id}  = req.params;
        const orders = await Order.findAll({
          where:{
              userId: id
          }
      });
      res.status(200).send(orders);
    } catch (error) {
      next(error);
    }
  });

module.exports = orderRouter;