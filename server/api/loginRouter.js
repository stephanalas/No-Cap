const express = require('express');
const bcrypt = require('bcrypt');
const {
  models: { User },
} = require('../db/models/associations');

const passport = require('passport');

const loginRouter = express.Router();

loginRouter.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),

  async (req, res, next) => {
    try {
      // More needed
    } catch (error) {
      next(error);
    }
  }
);

module.exports = loginRouter;
