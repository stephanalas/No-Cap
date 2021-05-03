/* eslint no-param-reassign: 'off' */
/* eslint no-console: 'off' */
/* eslint comma-dangle: 'off' */

const Sequelize = require('sequelize');
const { db } = require('../index.js');

const Review = db.define('review', {
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 5,
    validate: {
      isIn: [[0, 1, 2, 3, 4, 5]],
    },
  },
  body: {
    type: Sequelize.STRING(4000),
  },
});

module.exports = Review;
