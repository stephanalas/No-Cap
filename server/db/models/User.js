/* eslint no-param-reassign: 'off' */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { DataTypes } = require('sequelize');
const { db } = require('../index');
const Cart = require('./Cart');
const CartLineItem = require('./associations');

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
  role: {
    type: DataTypes.ENUM(['Admin', 'Anonymous', 'User']),
    defaultValue: 'Anonymous',
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
  },
  resetPasswordTokenExpires: {
    type: DataTypes.DATE,
    defaultValue: null,
    allowNull: true,
  },
});

User.addHook('beforeCreate', async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 12);
  }
});

User.addHook('beforeUpdate', async (user) => {
  if (user.password && user.password.slice(0, 4) !== '$2b$') {
    user.password = await bcrypt.hash(user.password, 12);
  }
});

// this hook is for seeding data for testing instead of functionality
User.addHook('afterBulkCreate', async (users) => {
  await Promise.all(
    users.map(async (user) => {
      const myCart = await Cart.create();
      user.cartId = myCart.id;
      await user.save();
    }),
  );
});

User.addHook('afterCreate', async (user) => {
  const myCart = await Cart.create();
  user.cartId = myCart.id;
  await user.save();
});

User.byToken = async (token) => {
  try {
    const { userId } = await jwt.verify(token, process.env.JWT);
    const user = await User.findAll({
      where: {
        id: userId,
      },
      include: {
        model: Cart,
      },
    });
    if (user[0]) {
      return user[0];
    }
    return 'JsonWebTokenError';
  } catch (ex) {
    console.log(ex.name);
    return ex.name;
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
