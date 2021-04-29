/* eslint no-console: 'off' */

// allows use to use the environment variables in the .env file
require('dotenv').config();

const express = require('express');
// morgan for development only!!
const morgan = require('morgan');

const path = require('path');
const router = require('./api/router');

const session = require('express-session');
const passport = require('passport');

const app = express();

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { db } = require('./db');

// basic setup for passport
require('./config/passport');

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
  })
);

// refresh passport middleware everytime we load a route
app.use(passport.initialize());

app.use(passport.session());

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.get('/', (req, res, next) => {
  try {
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
  } catch (err) {
    next(err);
  }
});

app.use('/api', router);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send({ error: err.message });
});

module.exports = app;
