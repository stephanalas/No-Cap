const express = require('express');

const {
  models: {
    User, Cart, Order, Review
  },
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
    const {
      firstName, lastName, email, password,
    } = req.body;

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
      include: [
        {
          model: Order,
          include: [
            {
              model: OrderLineItem,
            },
          ],
        },
        {
          model: Cart,
          include: [
            {
              model: CartLineItem,
            },
          ],
        },
      ],
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
  const {
    firstName, lastName, email, password, isAdmin,
  } = req.body;

  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const updatedUser = await user.update({
      firstName,
      lastName,
      email,
      isAdmin,
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
    console.log('hello');
    const { id } = req.params;
    const user = await User.findByPk(id);

    res.send(
      await user.getCart({
        include: [
          {
            model: CartLineItem,
          },
        ],
      }),
    );
  } catch (ex) {
    next(ex);
  }
});

userRouter.post('/:id/orders', async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(400);

    // to revise after authentication
    const { id } = req.params;

    if (!req.body.total) res.sendStatus(400);
    const { total } = req.body;
    const user = await User.findByPk(id);

    // get the users cart line items
    const cart = await user.getCart({
      include: [
        {
          model: CartLineItem,
        },
      ],
    });
    const cartItems = await CartLineItem.findAll({
      where: {
        cartId: cart.id,
      },
    });

    // if cart is empty throw bad request error
    if (cartItems.length < 1) res.sendStatus(400);

    // create an order
    const order = await Order.create({
      userId: user.id,
      total,
    });

    // create order line items from the users cart
    const orderLineItems = [];

    await Promise.all(
      cartItems.map(async (cartItem) => {
        const orderLineItem = await OrderLineItem.create({
          orderId: order.id,
          unitPrice: cartItem.unitPrice,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          subTotal: cartItem.subTotal,
        });
        orderLineItems.push(orderLineItem);
      }),
    );

    res.status(201).send({ ...order, orderLineItems });
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:id/orders', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    res.send(
      await user.getOrders({
        include: [
          {
            model: OrderLineItem,
          },
        ],
      }),
    );
  } catch (ex) {
    next(ex);
  }
});

// update a users cart
userRouter.put('/:id/updateCart', async (req, res, next) => {
  if (!req.body) {
    res.sendStatus(400);
  }
  /* cart object sent in request body expected to be in the form of
   cart: [
     {
       id: 1,
       price: 15.00,
       inventory: 5,
       quantity: 1
    },
     {
       id: 2,
       price: 30.00,
       inventory: 10,
       quantity: 2
     },
     ...
    ]
    essentially 'cart' is an array of product objects with an additional quantity key
    which represents the user's cart in the frontend
   */

  try {
    // deleting everything in the users cart and overwriting is probably not the best solution
    // but it is easier to implement quickly
    const { cart } = req.body;
    const { id } = req.params;
    const user = await User.findByPk(id);
    const userCart = await user.getCart({
      include: [
        {
          model: CartLineItem,
        },
      ],
    });

    // delete all the users cartLineItems if they exist
    await CartLineItem.destroy({
      where: { cartId: userCart.id },
    });
    const updatedCart = [];
    await Promise.all(
      cart.map(async (cartItem) => {
        const cartLineItem = await CartLineItem.create({
          cartId: userCart.id,
          unitPrice: cartItem.price,
          productId: cartItem.id,
          quantity: cartItem.quantity,
        });
        updatedCart.push(cartLineItem);
      }),
    );
    res.status(201).send({ ...userCart, cart: updatedCart });
  } catch (ex) {
    next(ex);
  }
});

userRouter.get('/:id/orders/:orderId', async (req, res, next) => {
  try {
    const { id, orderId } = req.params;
    const user = await User.findByPk(id);
    const order = await user.getOrders({
      where: {
        id: orderId,
      },
      include: [
        {
          model: OrderLineItem,
        },
      ],
    });

    res.send(order);
  } catch (ex) {
    next(ex);
  }
});

userRouter.post('/:userId/products/:productId/reviews', async (req, res, next) => {
  // create a product review from a user
  if (!req.body) res.sendStatus(400);

  try {
    const { userId, productId } = req.params;
    const { stars, body } = req.body;
    const review = await Review.create({
      userId,
      productId,
      body,
      stars,
    });
    res.status(201).send(review);
  } catch (ex) {
    next(ex);
  }
});

module.exports = userRouter;
