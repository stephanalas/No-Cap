const express = require('express');
const bcrypt = require('bcrypt');
const {
  models: { User },
} = require('../db/models/associations');

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      // if (err) { return done(err); }
      // if (!user) {
      //   return done(null, false, { message: 'Incorrect email.' });
      // }
      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      // return done(null, user);
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!bcrypt.compare(user.password, password)) {
        return cb(null, false, { message: 'Incorrect password.' });
      }
      return cb(null, user);
    });
  })
);

const loginRouter = express.Router();

// loginRouter.post(
//   '/',
//   passport.authenticate('local'),
//   {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true,
//   },
//   async (req, res, next) => {
//     try {
//       console.log(passport);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = loginRouter;
