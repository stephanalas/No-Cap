/* eslint no-console: 'off' */

// allows use to use the environment variables in the .env file
// require('dotenv').config();

const express = require('express');
// morgan for development only!!
const morgan = require('morgan');

const path = require('path');
require('./config/passport');

const app = express();

const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const router = require('./api/router');
const { db } = require('./db');

// basic setup for passport
const initPassport = require('./config/passport');

initPassport(passport);

app.use(
  session({
    store: new SequelizeStore({
      db,
    }),
    saveUninitialized: true,
    secret: 'secretKey',
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(flash());
// refresh passport middleware everytime we load a route
app.use(passport.initialize());

app.use(passport.session());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res, next) => {
  try {
    console.log('Hey');
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res) => {
  console.log(err);
  res.status(err.statusCode || 500).send({ error: err.message });
});

module.exports = app;
