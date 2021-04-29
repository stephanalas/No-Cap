/* eslint no-param-reassign: 'off' */

const Sequelize = require('sequelize');
const { db } = require('../index');
const Cart = require('./Cart');

const CartLineItem = db.define('cart_line_item', {
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
    defaultValue: 0,
    allowNull: false,
  },
});

//add a new line item to cart, calculate the subtotal and update the cart
CartLineItem.addHook('beforeCreate', (cartLineItem) => {
  const total = cartLineItem.unitPrice * cartLineItem.quantity;
  cartLineItem.totalPrice = total;
  const cart = await Cart.findByPk(cartLineItem.cartId);
  cart.total += total;
});

CartLineItem.addHook('beforeUpdate', (cartLineItem) => {
  const total = cartLineItem.unitPrice * cartLineItem.quantity;
  cartLineItem.totalPrice = total;
  const cart = await Cart.findByPk(cartLineItem.cartId);
  //check cart total against previous total
  
});


module.exports = CartLineItem;
