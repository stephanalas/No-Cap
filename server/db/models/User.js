/* eslint no-param-reassign: 'off' */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

User.addHook('beforeCreate', async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 12);
  }
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

User.byToken = async (token) => {
  try {
    const { userId } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(userId);
    if (user) {
      return user;
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

User.authenticate = async ({ email, password }) => {
  const error = Error('Invalid credentials');
  error.status = 401;
  if (!email || !password) return error;

  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ userId: user.id }, process.env.JWT);
  }

  throw error;
};

module.exports = User;
