const express = require('express');
// const bcrypt = require('bcrypt');
// const {
//   models: { User },
// } = require('../db/models/associations');

const passport = require('passport');

const loginRouter = express.Router();

loginRouter.post('/', passport.authenticate('local'), async (req, res, next) => {
  try {
    console.log(req.user);
    // create token for user
    // send it to frontend

    res.json({ message: 'Success!' });
  } catch (error) {
    res.redirect('/login');
    next(error);
  }
});

module.exports = loginRouter;
