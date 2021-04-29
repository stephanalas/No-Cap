const express = require('express');

const loginRouter = express.Router();
const bcrypt = require('bcrypt');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
  models: { User },
} = require('../db/models/associations');

passport.use(
  new LocalStrategy((email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!bcrypt.compare(user.password, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }),
);

loginRouter.post('/', passport.authenticate('local'), async(req, res, next) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  try{
    await res.send(req.body);
    res.redirect(`/${req.user.email}`);
  }
  catch(err) {
    next(err);
  }
});

// loginRouter.post('/', async (req, res, next) => {
//   try {
//     console.log(req.body);
//     await res.send(req.body);
//   }
//   catch (err) {
//     next(err);
//   }
// });

module.exports = loginRouter;
