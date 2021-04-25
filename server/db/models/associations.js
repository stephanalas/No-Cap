const Order = require("./Order");
const OrderLineItem = require("./OrderLineItem");
const { User } = require("./User");
const { Product } = require("./Product");
const Review = require("./Review");
const Cart = require("./Cart");
const CartLineItem = require("./CartLineItem");

// Product

Product.hasMany(Review);

// Order

Order.belongsTo(User);
Order.hasMany(OrderLineItem);
OrderLineItem.belongsTo(Order);
OrderLineItem.belongsTo(Product);

// Cart
// Cart does not need userId
// get user's cart with User.getCart()
Cart.hasOne(User);
Cart.hasMany(CartLineItem);

// Cart Line Item
Product.hasMany(CartLineItem);
CartLineItem.belongsTo(Product);

// User
User.hasMany(Order);
User.belongsTo(Cart);

// Review
Review.belongsTo(User);

module.exports = {
  models: {
    Cart,
    CartLineItem,
    Order,
    OrderLineItem,
    User,
    Product,
    Review,
  },
};
