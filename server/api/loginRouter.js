const express = require('express');

const {
  models: { User },
} = require('../db/models/associations');

const requireToken = require('../requireToken');

const loginRouter = express.Router();

loginRouter.post('/auth', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (ex) {
    next(ex);
  }
});

loginRouter.get('/auth', requireToken, async (req, res, next) => {
  try {
    res.send({ data: req.user });
  } catch (ex) {
    next(ex);
  }
});

module.exports = loginRouter;
