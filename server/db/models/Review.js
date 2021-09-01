/* eslint no-param-reassign: 'off' */
/* eslint no-console: 'off' */
/* eslint comma-dangle: 'off' */

const Sequelize = require('sequelize');
const { db } = require('../index.js');
const Product = require('./Product.js');

const Review = db.define('review', {
  stars: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 5,
    validate: {
      isIn: [[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]],
    },
  },
  body: {
    type: Sequelize.STRING(4000),
  },
});

Review.addHook('afterCreate', async (review) => {
  const product = await Product.findByPk(review.productId);
  if (product) {
    product.increment('reviewCount', { by: 1 });
    product.save();
  }
});

module.exports = Review;
