const express = require('express');
const stripe = require('stripe')(
  'sk_test_51ImrllFdJ30zvHzoR1wb9jEeihRFQM0oDO6mak2DaCthEfUxj2UGI76RHQWWsO24pDSF5SODdnN2yiiBhcH3GDFB00BYZ5q0ri'
);
const { v4 } = require('uuid');

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

orderRouter.post('/users/:userId', async (req, res, next) => {
  try {
    const itemList = req.body;
    const orderTotal = itemList.reduce((acc, curr) => {
      return parseFloat(acc) + parseFloat(curr.subTotal);
    }, 0);
    const newOrder = await Order.create({
      userId: req.params.userId,
      total: orderTotal,
    });
    itemList.map(async (item) => {
      await OrderLineItem.create({
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        productId: item.product.id,
        orderId: newOrder.id,
      });
    });
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

orderRouter.post('/checkout', async (req, res, next) => {
  let status;
  try {
    const { cartTotal, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = v4();
    const charge = await stripe.charges.create(
      {
        amount: cartTotal * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: 'Your NoCap purchase order',
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key,
      }
    );
    // console.log('Charge:', { charge });
    status = 'success';
    res.status(200).send(status);
  } catch (error) {
    console.error('Error', error);
    status = 'failure';
    res.status(500).send(status);
    next(error);
  }
});

module.exports = orderRouter;
