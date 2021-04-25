/* eslint no-param-reassign: 'off' */
/* eslint no-console: 'off' */
/* eslint comma-dangle: 'off' */

const Sequelize = require('sequelize');
const path = require('path');
const { db } = require('../index.js');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: Sequelize.ENUM([
      'Beanie',
      'Beret',
      'Baseball Hat',
      'Fedora',
      'Cowboy Hat',
      'Fez',
      'Top Hat',
      'Other',
    ]),
    allowNull: false,
    defaultValue: 'Other',
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  photo: {
    type: Sequelize.STRING,
  },
  color: {
    type: Sequelize.ENUM(['Black', 'Brown', 'Red', 'Green', 'Blue', 'Other']),
    allowNull: false,
    defaultValue: 'Other',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "I'm a hat",
  },
  rating: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    defaultValue: 0,
  },
});

Product.addHook('beforeCreate', async (hat) => {
  try {
    if (!hat.photo) {
      const url = path.join(__dirname, '..', '..', '..', 'public', 'defaulthat.jpeg');
      hat.photo = url;
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = { Product };
