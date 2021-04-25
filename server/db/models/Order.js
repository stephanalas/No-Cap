const Sequelize = require('sequelize');
const { db } = require('../index');

const Order = db.define('order', {
  order_total: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Order;
