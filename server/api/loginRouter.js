const express = require('express');
const passport = require('passport');

const loginRouter = express.Router();

loginRouter.post(
  '/',
  passport.authenticate('local'),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.status(201).send(user);
      // create token for user
      // send it to frontend

      // res.json({ message: 'Success!' });
    } catch (error) {
      res.redirect('/login');
      next(error);
    }
  }
);

module.exports = loginRouter;
