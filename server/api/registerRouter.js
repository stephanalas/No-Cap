const express = require('express');

const {
  models: {
    User, Order, Cart, OrderLineItem, CartLineItem,
  },
} = require('../db/models/associations');

const registerRouter = express.Router();

registerRouter.post('/', async (req, res, next) => {
  try {
    const {
      firstName, lastName, email, password,
    } = req.body;

    const tryToFindUser = await User.findOne({
      include: [
        {
          model: Order,
          include: [
            {
              model: OrderLineItem,
            },
          ],
        },
        {
          model: Cart,
          include: [
            {
              model: CartLineItem,
            },
          ],
        },
      ],
      where: { email },
    });

    if (tryToFindUser) {
      res.status(403).json({ message: 'User already exists ' });
    }
    await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    const token = await User.authenticate(req.body);

    res.status(201).send({ token });
  } catch (error) {
    res.redirect('/register');
    next(error);
  }
});

module.exports = registerRouter;
