const Sequelize = require('sequelize');
const { db } = require('../index');

const CartLineItem = db.define('cart_line_item', {
  unitPrice: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10,2),
  },
});

CartLineItem.addHook('beforeCreate', (cart)=>{
    const total = cart.unitPrice * cart.quantity;
    cart.totalPrice = total;
});

CartLineItem.addHook('beforeUpdate', (cart)=>{
    const total = cart.unitPrice * cart.quantity;
    cart.totalPrice = total;
});

module.exports = CartLineItem;