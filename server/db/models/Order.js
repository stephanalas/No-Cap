const Sequelize = require('sequelize');
const { db } = require('../index');

const Order = db.define('order', {
  order_total: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Order;
