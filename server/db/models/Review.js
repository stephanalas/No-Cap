/* eslint no-param-reassign: 'off' */
/* eslint no-console: 'off' */
/* eslint comma-dangle: 'off' */

const Sequelize = require('sequelize');
const { db } = require('../index.js');
const Product = require('./Product.js');

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

Review.addHook('afterCreate', async (review) => {
  const product = await Product.findByPk(review.productId);
  if (product) product.save();
});

module.exports = Review;
