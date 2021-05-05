const Sequelize = require('sequelize');
const { db } = require('../index');
//const CartLineItem = require('./CartLineItem');

const Cart = db.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: true,
    defaultValue: 0
  }
});

Cart.addHook('beforeSave', async (cart) => {
  try{

    const cartLineItems = await cart.getCart_line_items();
    if(cartLineItems.length){
      cart.total = cartLineItems.reduce((acc, cartLineItem) =>{
        return acc + (cartLineItem.subTotal * 1);
      }, 0);
    }
  }
  catch(err){
    console.log(err);
  }
});

module.exports = Cart;
