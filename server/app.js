const express = require('express');

const router = require('./api/router');

const app = express();

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.use('/api', router);

module.exports = app;
