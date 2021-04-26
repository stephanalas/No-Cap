const Sequelize = require('sequelize');
const { db } = require('../index');

const Cart = db.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Cart;
