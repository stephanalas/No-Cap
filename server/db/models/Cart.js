const Sequelize = require('sequelize');
const { db } = require('../index');
const CartLineItem = require('./associations');

const Cart = db.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total: {
    type: Sequelize.DECIMAL(10,2),
    defaultValue: 0,
    allowNull: false,
  }
});

/*
Cart.addHook('afterUpdate', async(cart)=>{
  const lineItems = await CartLineItem.findAll({
    where: {
      cartId: cart.id
    }
  });

  cart.total = lineItems.reduce((acc, curr)=>{
    acc += curr.totalPrice;
    return acc;
  }, 0);
})*/

module.exports = Cart;
