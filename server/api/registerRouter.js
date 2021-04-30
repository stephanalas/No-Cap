const express = require('express');
const bcrypt = require('bcrypt');
const {
  models: { User },
} = require('../db/models/associations');

const registerRouter = express.Router();

registerRouter.post('/', async (req, res, next) => {
  try {
    const {
      firstName, lastName, email, password,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName, lastName, email, password: hashPassword,
    });
    req.flash('success_msg', 'Successfully registered');
    res.sendStatus(200);
  } catch (error) {
    res.redirect('/register');
    next(error);
  }
});

module.exports = registerRouter;
