/* eslint no-console: 'off' */

const express = require('express');
// morgan for development only!!
const morgan = require('morgan');
const path = require('path');
const router = require('./api/router');

const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.get('/', (req, res, next) => {
  try {
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
  } catch (err) {
    next(err);
  }
});

app.use('/api', router);

app.use((err, req, res) => {
  console.log(err);
  res.status(err.statusCode || 500).send({ error: err.message });
});

module.exports = app;
