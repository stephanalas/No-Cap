/* eslint no-param-reassign: 'off' */

const { DataTypes } = require('sequelize');
const { db } = require('../index');
const Cart = require('./Cart');

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  address: {
    type: DataTypes.STRING,
  },
});

// this hook is for seeding data for testing instead of functionality
User.addHook('afterBulkCreate', (users) => {
  users.forEach(async (user) => {
    const myCart = await Cart.create();
    user.cartId = myCart.id;
    await user.save();
  });
});

User.addHook('afterCreate', async (user) => {
  const myCart = await Cart.create();
  user.cartId = myCart.id;
  await user.save();
});

module.exports = { User };
