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
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

OrderLineItem.addHook('beforeCreate', (order) => {
  const total = order.unitPrice * order.quantity;
  order.totalPrice = total;
});

module.exports = OrderLineItem;
