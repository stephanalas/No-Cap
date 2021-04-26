const express = require('express');

const {
  models: { User, Order },
} = require('../db/models/associations');

const userRouter = express.Router();

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      include: {
        model: Order,
      },
      where: {
        id: userId,
      },
    });
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
