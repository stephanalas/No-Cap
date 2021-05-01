const express = require('express');

const {
  models: { User },
} = require('../db/models/associations');

// const requireToken = require('../app');

async function requireToken(req, res, next) {
  try {
    const token = req.headers.authorization;

    const user = await User.byToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

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
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

module.exports = loginRouter;
