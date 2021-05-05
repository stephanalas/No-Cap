/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../../server/app');

const request = supertest(app);
const { db, initDB } = require('../../../../server/db/index');

const {
  models: {
    User, Cart, Product, CartLineItem,
  },
} = require('../../../../server/db/models/associations');

describe('Cart Routes', () => {
  beforeAll(async () => {
    await initDB();

    await User.bulkCreate([
      {
        firstName: 'Joe',
        lastName: 'Shmo',
        email: 'jshmo@aol.com',
        password: 'hello123',
      },
      {
        firstName: 'Connie',
        lastName: 'Salad',
        email: 'csalad@hotmail.com',
        password: 'password',
      },
    ]);

    await Product.create({
      name: 'basic hat',
      category: 'Beanie',
      price: 19.95,
      inventory: 20,
      color: 'Black',
    });

    await CartLineItem.bulkCreate([
      {
        unitPrice: 20.0,
        quantity: 3,
        subTotal: 60.0,
        cartId: 2,
      },
      {
        unitPrice: 15.0,
        quantity: 2,
        subTotal: 30.0,
        cartId: 2,
      },
      {
        unitPrice: 10.0,
        quantity: 4,
        subTotal: 40.0,
        cartId: 2,
      },
    ]);
  });

  afterAll(async () => {
    await db.close();
  });

  test('PUT /api/cart/:id/removeCartItem', async (done) => {
    const user = await User.findOne({
      include: {
        model: Cart,
        include: {
          model: CartLineItem,
        },
      },
      where: {
        id: 2,
      },
    });
    const lineItem = user.cart.cart_line_items[1];
    console.log(lineItem);
    let response = await request.put(`/api/cart/${user.cartId}/removeCartItem`).send({ lineId: 1 });

    response = JSON.parse(response.text);

    expect(response.cart_line_items.length).toBe(2);
    done();
  });

  test('PUT /api/cart/:id/updateQuantity', async (done) => {
    const user = await User.findOne({
      include: {
        model: Cart,
        include: {
          model: CartLineItem,
          include: {
            model: Product
          }
        },
      },
      where: {
        id: 2,
      },
    });

    const lineItem = user.cart.cart_line_items[1];
    let lineID = {
      lineId: lineItem.id,
      quantity: 5,
    };
    let response = await request.put(`/api/cart/${user.cartId}/updateQuantity`).send(lineID);

    response = JSON.parse(response.text);
    expect(response.quantity).toBe(5);
    
    done();
  });
});
