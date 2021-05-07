const express = require('express');
const requireToken = require('../requireToken');

const {
  models: {
    User, Cart, CartLineItem, Product,
  },
} = require('../db/models/associations');

const cartRouter = express.Router();

cartRouter.put('/:id/removeCartItem', requireToken, async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(400);

    const { id } = req.params;
    const { lineId } = req.body;

    const lineItem = await CartLineItem.findByPk(lineId);
    await lineItem.destroy();

    const newCart = await Cart.findOne({
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

    await newCart.save();

    res.send(newCart);
  } catch (ex) {
    next(ex);
  }
});

cartRouter.put('/:id/updateQuantity', requireToken, async (req, res, next) => {
  try {
    if (!req.body) {
      res.sendStatus(400);
    }
    // const { id } = req.params;
    const { lineId, quantity } = req.body;
    let lineItem = await CartLineItem.findOne({
      include: {
        model: Product,
      },
      where: {
        id: lineId,
      },
    });
    lineItem = await lineItem.update({
      quantity,
    });

    res.send(lineItem);
  } catch (ex) {
    next(ex);
  }
});

module.exports = cartRouter;
