const express = require('express');

const {
  models: { User },
} = require('../db/models/associations');

const requireToken = require('../requireToken');

const loginRouter = express.Router();

loginRouter.post('/auth', async (req, res, next) => {
  try {
    const tokenOrError = await User.authenticate(req.body);

    const errors = [
      'email required',
      'password required',
      'email not found',
      'invalid password',
    ];
    if (errors.includes(tokenOrError)) {
      const error = tokenOrError;
      res.send({ error });
    } else {
      res.send({ token: await User.authenticate(req.body) });
    }
  } catch (ex) {
    next(ex);
  }
});

loginRouter.get('/auth', requireToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

module.exports = loginRouter;
