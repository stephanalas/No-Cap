const {
  models: { User },
} = require('../db/models/associations');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const initPassport = (passport) => {
  console.log('helllo');
  const authenticateUser = async (email, password, done) => {
    console.log('Hellloooooooo');
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      console.log('No user!');
      return done(null, false, { message: 'Incorrect email.' });
    }
    if (await !bcrypt.compare(user.password, password)) {
      console.log('Password did not match!');
      return done(null, false, { message: 'Incorrect password.' });
    }
    console.log('you made it!');
    return done(null, user);
  };
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) throw Error('No user available');
      else done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = initPassport;
