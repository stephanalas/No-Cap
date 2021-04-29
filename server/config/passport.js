const {
  models: { User },
} = require('../db/models/associations');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { db } = require('../db/');

passport.use(
  new LocalStrategy((email, password, done) => {
    User.findOne({ email: email }, function (err, user) {
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw Error('No user available');
    else done(null, user);
  } catch (error) {
    done(error);
  }
});
