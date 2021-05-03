const express = require('express');

const {
  models: { Order },
} = require('../db/models/associations');
const OrderLineItem = require('../db/models/OrderLineItem');

const orderRouter = express.Router();

orderRouter.get('/', async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(400);

    const orders = await Order.findAll({ include: [{ model: OrderLineItem }] });
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

// this currently gets an order by a user id (may need to revisit)
orderRouter.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      include: [{ model: OrderLineItem }],
      where: {
        userId,
      },
    });
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

// this allows an admin to update order.status to fulfilled
orderRouter.put('/:orderId', async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(400);
    const { status } = req.body;
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);
    order.update({ status });
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = orderRouter;
