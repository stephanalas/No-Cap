const express = require('express');

const {
  models: {
    User, Cart, CartLineItem, Product
  },
} = require('../db/models/associations');

const cartRouter = express.Router();

cartRouter.put('/:id/removeCartItem', async (req, res, next) => {
    try {
      if (!req.body) res.sendStatus(400);
  
      const { id } = req.params;
      const {lineId} = req.body;
      let lineItem = await CartLineItem.findByPk(lineId);
      let removed = await lineItem.destroy();

      const cart = await Cart.findOne({
        include: {
            model: CartLineItem,
            include:{
                model: Product
            }
        },
        where: {
            id: id
        }
      });

      res.send(cart);
    } catch (ex) {
      next(ex);
    }
  });

  module.exports = cartRouter;