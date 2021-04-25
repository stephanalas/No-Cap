const Sequelize = require('sequelize');
const { db } = require('../index');

const OrderLineItem = db.define('order_line_item', {
  unitPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.FLOAT,
  },
});

OrderLineItem.addHook('beforeCreate', (order, options)=>{
    const total = order.unitPrice * order.quantity;
    order.totalPrice = total;
});

module.exports = OrderLineItem;