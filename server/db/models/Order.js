const Sequelize = require('sequelize');
const { db } = require('../index');
const OrderLineItems = require('./associations');

const Order = db.define('order', {
  total: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Order;
