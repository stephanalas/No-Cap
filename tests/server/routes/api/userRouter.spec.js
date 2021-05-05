/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../../server/app');

const request = supertest(app);
const { db, initDB } = require('../../../../server/db/index');

const {
  models: {
    User, Order, OrderLineItem, Product, CartLineItem,
  },
} = require('../../../../server/db/models/associations');

describe('User Routes', () => {
  beforeAll(async () => {
    // await Order.sync({ force: true });
    // await User.sync({ force: true });
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
    await Order.bulkCreate([{ userId: 2 }, { userId: 2 }]);
  });

  afterAll(async () => {
    await db.close();
  });

  test('GET /api/users length', async (done) => {
    const response = await request.get('/api/users');
    expect(JSON.parse(response.text).length).toBe(2);
    done();
  });
  test('GET /api/users find', async (done) => {
    let response = await request.get('/api/users');
    response = JSON.parse(response.text);
    const user = response.filter((item) => item.firstName === 'Joe');
    expect(user[0].firstName).toBe('Joe');
    done();
  });
  test('GET /api/users/:id find', async (done) => {
    let response = await request.get('/api/users/2');
    response = JSON.parse(response.text);
    expect(response.firstName).toBe('Connie');
    done();
  });
  test('GET /api/users/:id order find', async (done) => {
    let response = await request.get('/api/users/2');
    response = JSON.parse(response.text);
    expect(response.orders.length).toBe(2);
    done();
  });

  test('POST /api/users creates a new user', async (done) => {
    const userData = {
      firstName: 'Michael',
      lastName: 'Jordan',
      email: 'mjordan@hotmail.com',
      password: 'password',
    };
    let response = await request.post('/api/users').send(userData);
    response = JSON.parse(response.text);
    expect(response.email).toBe(userData.email);
    done();
  });

  test('PUT /api/users/:id updates a user with id', async (done) => {
    // requires post route to work
    const userData = {
      firstName: 'Michael',
      lastName: 'Jordan',
      email: 'mjordan2@hotmail.com',
      password: 'password',
    };
    let response = await request.post('/api/users').send(userData);
    const user = JSON.parse(response.text);
    const newFirstName = 'Mike';
    const newEmail = 'mjordan3@hotmail.com';
    userData.firstName = newFirstName;
    userData.email = newEmail;
    userData.role = 'Admin';

    response = await request.put(`/api/users/${user.id}`).send(userData);
    response = JSON.parse(response.text);
    const { firstName, email, role } = response;
    expect(firstName).toBe(userData.firstName);
    expect(email).toBe(userData.email);
    expect(role).toBe(userData.role);
    done();
  });

  // authenticated route
  test('AUTH DELETE /api/users/:id deletes a user where ID comes from JWT', async (done) => {
    const userData = {
      firstName: 'Michael',
      lastName: 'Jordan',
      email: 'mjordan4@hotmail.com',
      password: 'password',
    };
    let response = (await request.post('/api/users').send(userData)).body;

    response = await request.post('/api/login/auth').send({
      email: userData.email,
      password: userData.password,
    });
    const { token } = response.body;
    let authenticatedUser;
    if (token) {
      authenticatedUser = (
        await request.get('/api/login/auth').set({
          authorization: token,
        })
      ).body;
    }
    const { id } = authenticatedUser;
    response = await request.delete(`/api/users/${id}`).set({ authorization: token });

    expect(response.status).toEqual(204);
    done();
  });

  test('POST /api/users/:id/orders posts a users order', async (done) => {
    const user = await User.findByPk(1);

    await CartLineItem.create({
      cartId: user.cartId,
      unitPrice: 12.5,
      productId: 1,
      quantity: 3,
    });

    await CartLineItem.create({
      cartId: user.cartId,
      unitPrice: 5.0,
      productId: 1,
      quantity: 4,
    });

    let response = await request.post(`/api/users/${user.id}/orders`).send({ total: 57.5 });
    response = JSON.parse(response.text);

    expect(response.orderLineItems.length).toBe(2);
    done();
  });

  test('GET /api/users/:id/orders gets all of a users order', async (done) => {
    const user = await User.create({
      firstName: 'Steve',
      lastName: 'Rogers',
      email: 'TheCaptain@aol.com',
      password: 'america',
    });

    await Product.create({
      name: 'other hat',
      category: 'Fez',
      price: 10.0,
      inventory: 20,
      color: 'Black',
    });
    await Order.bulkCreate([
      {
        userId: user.id,
        total: 19.95,
      },
      {
        userId: user.id,
        total: 99.75,
      },
    ]);
    await OrderLineItem.create({
      orderId: 1,
      unitPrice: 19.95,
      productId: 1,
      quantity: 1,
      subTotal: 19.95,
    });

    await OrderLineItem.create({
      orderId: 2,
      unitPrice: 19.95,
      productId: 1,
      quantity: 2,
      subTotal: 39.9,
    });
    await OrderLineItem.create({
      orderId: 2,
      unitPrice: 10.0,
      productId: 2,
      quantity: 2,
      subTotal: 20.0,
    });

    let response = await request.get(`/api/users/${user.id}/orders`);
    response = JSON.parse(response.text);

    // console.log(response);
    expect(response.length).toBe(2);
    done();
  });

  test('PUT /api/users/:id/updateCart updates a users cart', async (done) => {
    const cart = [
      {
        id: 1,
        price: 15.0,
        inventory: 5,
        quantity: 1,
      },
      {
        id: 2,
        price: 30.0,
        inventory: 10,
        quantity: 2,
      },
    ];

    let response = await request.put('/api/users/1/updateCart').send({ cart });
    response = JSON.parse(response.text);

    expect(response.cart.length).toBe(2);
    done();
  });

  // Not Passing- needs to be revised
  // test('PUT /api/users/:id/orders/:id updates a users order by orderID', async (done) => {
  //   const user = await User.create({
  //     firstName: 'Bucky',
  //     lastName: 'Barnes',
  //     email: 'WinterSolder@aol.com',
  //     password: 'sadness',
  //   });

  //   const order = await Order.create({
  //     userId: user.id,
  //     total: 99.75,
  //   });

  //   const lineItem = await OrderLineItem.create({
  //     orderId: order.id,
  //     unitPrice: 19.95,
  //     productId: 1,
  //     quantity: 5,
  //     subTotal: 99.75,
  //   });

  //   let response = await request
  //     .put(`/api/users/${user.id}/orders/${order.id}`)
  //     .send({ unitPrice: 20.95, productId: 1, quantity: 5, subTotal: 99.75 });
  //   response = JSON.parse(response.text);

  //   console.log(response.text);
  //   expect(response.length).toBe(2);
  //   done();
  // });

  //  users cart routes

  test('GET /api/users/:id/cart', async (done) => {
    const user = await User.findByPk(1);
    const cart = await user.getCart();

    const response = await request.get(`/api/users/${user.id}/cart`);
    const data = JSON.parse(response.text);
    expect(data.id).toBe(cart.id);
    done();
  });

  test('POST /api/users/:id/products/:id/reviews', async (done) => {
    const user = await User.findByPk(1);
    const product = await Product.findByPk(1);
    const stars = 5;
    const body = 'What an amazing hat!';
    const response = await request
      .post(`/api/users/${user.id}/products/${product.id}/reviews`)
      .send({
        productId: product.id,
        userId: user.id,
        stars,
        body,
      });
    const data = JSON.parse(response.text);
    expect(data.stars).toBe(5);
    expect(data.body).toBe(body);
    done();
  });
});
