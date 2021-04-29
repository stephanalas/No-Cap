const { response } = require('express');
const express = require('express');

const {
  models: { User, Order },
} = require('../db/models/associations');
const CartLineItem = require('../db/models/CartLineItem');
const OrderLineItem = require('../db/models/OrderLineItem');

const userRouter = express.Router();

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(400);
    // will need to update this with appropriate fields
    const { firstName, lastName, email, password } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      include: {
        model: Order,
      },
      where: {
        id: userId,
      },
    });
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.put('/:id', async (req, res, next) => {
  if (!req.body) {
    res.sendStatus(400);
  }
  // will need to update this with appropriate fields
  const { firstName, lastName, email, password } = req.body;

  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const updatedUser = await user.update({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(200).send(updatedUser);
  } catch (ex) {
    next(ex);
  }
});

userRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    await user.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

userRouter.get('/:id/cart', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    res.send(await user.getCart());
  } catch (ex) {
    next(ex);
  }
});

userRouter.post('/:id/orders', async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(400);

    const { id } = req.params;

    const user = await User.findByPk(id);
    //get the users cart line items
    const cart = await user.getCart();
    const cartItems = await CartLineItem.findAll({
      where: {
        cartId: cart.id
      }
    });
    
    //if cart is empty throw bad request error
    if(cartItems.length < 1) res.sendStatus(400);

  

    //create order line items from the users cart
    const orderLineItems = [];
    cartItems.map(async cartItem =>{
      const orderLineItem = await OrderLineItem.create({
        //orderId: order.id,
        unitPrice: cartItem.unitPrice,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        totalPrice: cartItem.totalPrice
      })
      orderLineItems.push(orderLineItem);
    });
      
    //create an order
    let order = await Order.create({
      userId: user.id
    });

    res.status(201).send({...order, orderLineItems: orderLineItems});
  } catch (error) {
    next(error);
  }
}); 

userRouter.get('/:id/orders', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    res.send(await user.getOrders());
  } catch (ex) {
    next(ex);
  }
}); 

module.exports = userRouter;
