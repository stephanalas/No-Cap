const express = require('express');

const {
  models: {
    User, Cart, CartLineItem, Product,
  },
} = require('../db/models/associations');

const cartRouter = express.Router();

cartRouter.put('/:id/removeCartItem', async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(400);

    const { id } = req.params;
    const { lineId } = req.body;
    const lineItem = await CartLineItem.findByPk(lineId);
    const removed = await lineItem.destroy();

    const cart = await Cart.findOne({
      include: {
        model: CartLineItem,
        include: {
          model: Product,
        },
      },
      where: {
        id,
      },
    });

    res.send(cart);
  } catch (ex) {
    next(ex);
  }
});

module.exports = cartRouter;
