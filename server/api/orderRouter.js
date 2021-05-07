const express = require('express');
const stripe = require('stripe')(
  'sk_test_51ImrllFdJ30zvHzoR1wb9jEeihRFQM0oDO6mak2DaCthEfUxj2UGI76RHQWWsO24pDSF5SODdnN2yiiBhcH3GDFB00BYZ5q0ri',
);
const { v4 } = require('uuid');

const requireToken = require('../requireToken');

const {
  models: {
    Order, CartLineItem, Cart, User,
  },
} = require('../db/models/associations');
const OrderLineItem = require('../db/models/OrderLineItem');

const orderRouter = express.Router();

orderRouter.get('/', requireToken, async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(400);

    const { role } = req.user;
    if (role === 'Admin') {
      const orders = await Order.findAll({
        include: [{ model: OrderLineItem }],
      });
      res.status(200).send(orders);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

orderRouter.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === 'Admin') {
      const { userId } = req.params;
      const orders = await Order.findAll({
        include: [{ model: OrderLineItem }],
        where: {
          userId,
        },
      });
      res.status(200).send(orders);
    } else {
      const { id } = req.user;
      const userId = id;
      const orders = await Order.findAll({
        include: [{ model: OrderLineItem }],
        where: {
          userId,
        },
      });
      res.status(200).send(orders);
    }
  } catch (error) {
    next(error);
  }
});

orderRouter.post('/users/:userId', requireToken, async (req, res, next) => {
  try {
    const { id } = req.user;
    // console.log('log in api/orders/users/id', id, req.body);
    // const { userId } = req.params;
    const userId = id;
    const itemList = req.body;
    const orderTotal = itemList.reduce((acc, curr) => {
      return parseFloat(acc) + parseFloat(curr.subTotal);
    }, 0);
    const newOrder = await Order.create({
      userId,
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
    await CartLineItem.destroy({ where: {} });
    const user = await User.findOne({ where: { id: userId } });
    const userCart = await Cart.findOne({ where: { id: user.cartId } });
    userCart.total = 0;
    await userCart.save();
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

// this allows an admin to update order.status to fulfilled
orderRouter.put('/:orderId', requireToken, async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(400);
    const { role } = req.user;
    if (role === 'Admin') {
      const { status } = req.body;
      const { orderId } = req.params;
      const order = await Order.findByPk(orderId);
      order.update({ status });
      res.status(200).send(order);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

orderRouter.post('/checkout', requireToken, async (req, res, next) => {
  let status;
  try {
    const { cartTotal, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = v4();
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
        idempotencyKey,
      },
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
