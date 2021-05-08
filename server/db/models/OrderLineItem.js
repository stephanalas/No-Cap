/* eslint no-param-reassign: 'off' */

const Sequelize = require('sequelize');
const { db } = require('../index');

const OrderLineItem = db.define('order_line_item', {
  unitPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  subTotal: {
    type: Sequelize.DECIMAL(10, 2),
  },
  photo: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
});

OrderLineItem.addHook('beforeCreate', (orderLineItem) => {
  const total = orderLineItem.unitPrice * orderLineItem.quantity;
  orderLineItem.subTotal = total;
});

OrderLineItem.addHook('beforeUpdate', (orderLineItem) => {
  const total = orderLineItem.unitPrice * orderLineItem.quantity;
  orderLineItem.subTotal = total;
});

module.exports = OrderLineItem;
