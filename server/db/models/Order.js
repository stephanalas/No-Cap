const Sequelize = require('sequelize');
const { db } = require('../index');

const Order = db.define('order', {
  total: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: Sequelize.ENUM(['Processing', 'Fulfilled']),
    allowNull: false,
    defaultValue: 'Processing',
  },
});

module.exports = Order;
