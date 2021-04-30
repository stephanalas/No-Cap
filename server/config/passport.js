const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {
  models: { User },
} = require('../db/models/associations');

const initPassport = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    if (await !bcrypt.compare(user.password, password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  };
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user, done) => {
    // console.log(user);
    done(null, user);
  });

  passport.deserializeUser(async (user, done) => {
    try {
      const foundUser = await User.findOne({
        where: {
          id: user.Id,
        },
      });
      if (!foundUser) throw Error('No user available');
      else done(null, foundUser);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = initPassport;
