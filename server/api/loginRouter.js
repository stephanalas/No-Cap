const express = require('express');

const app = express();
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

const loginRouter = express.Router();

app.post('/login', passport.authenticate('local'), (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  console.log('hello world');
  res.redirect(`/${req.user.email}`);
});

module.exports = loginRouter;
