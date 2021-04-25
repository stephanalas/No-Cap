const Order = require('./Order');
const OrderLineItem = require('./OrderLineItem');
const { User } = require('./User');
const { Product } = require('./Product');
const Review = require('./Review');
// const Cart = require('./Cart');
// const CartLineItem = require('./CartLineItem');

// Product

Product.hasMany(Review);

// Order

Order.belongsTo(User);
Order.hasMany(OrderLineItem);
OrderLineItem.belongsTo(Order);
OrderLineItem.belongsTo(Product);

// Cart
// Cart.belongsTo(User)
// Cart.hasMany(CartLineItem)

// User
User.hasMany(Order);

// Review
Review.belongsTo(User);

module.exports = {
  models: {
    Order, OrderLineItem, User, Product, Review,
  },
};
