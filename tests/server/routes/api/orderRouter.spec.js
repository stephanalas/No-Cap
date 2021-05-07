/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../../server/app');

const request = supertest(app);
const { db, initDB } = require('../../../../server/db/index');

const {
  models: {
    User, Order, OrderLineItem, Product,
  },
} = require('../../../../server/db/models/associations');

let token;
describe('Orders Routes', () => {
  beforeAll(async () => {
    try {
      await initDB();

      await User.bulkCreate([
        {
          firstName: 'Joe',
          lastName: 'Shmo',
          email: 'jshmo@aol.com',
          password: 'hello123',
          role: 'Admin',
        },
        {
          firstName: 'Connie',
          lastName: 'Salad',
          email: 'csalad@hotmail.com',
          password: 'password',
        },
      ]);
      await Product.create({
        name: 'bad hat',
        category: 'Fez',
        price: 5.0,
        inventory: 20,
        color: 'Black',
      });
      await Product.create({
        name: 'bowler hat',
        category: 'Fedora',
        price: 10.0,
        inventory: 20,
        color: 'Black',
      });
      await Product.create({
        name: 'classy hat',
        category: 'Fedora',
        price: 15.0,
        inventory: 20,
        color: 'Black',
      });
      await Order.bulkCreate([
        {
          userId: 1,
          total: 30.0,
        },
        {
          userId: 2,
          total: 50.0,
        },
        {
          userId: 2,
          total: 15.0,
        },
      ]);
      await OrderLineItem.bulkCreate([
        {
          orderId: 1,
          unitPrice: 5.0,
          productId: 1,
          quantity: 2,
          subTotal: 10.0,
        },
        {
          orderId: 1,
          unitPrice: 10.0,
          productId: 2,
          quantity: 2,
          subTotal: 20.0,
        },
        {
          orderId: 2,
          unitPrice: 15.0,
          productId: 3,
          quantity: 1,
          subTotal: 15.0,
        },
        {
          orderId: 2,
          unitPrice: 10.0,
          productId: 2,
          quantity: 2,
          subTotal: 20.0,
        },
        {
          orderId: 2,
          unitPrice: 15.0,
          productId: 3,
          quantity: 1,
          subTotal: 15.0,
        },
        {
          orderId: 3,
          unitPrice: 5.0,
          productId: 1,
          quantity: 3,
          subTotal: 15.0,
        },
      ]);
      const response = await request.post('/api/login/auth').send({
        email: 'jshmo@aol.com',
        password: 'hello123',
      });
      token = response.body.token;
    } catch (ex) {
      console.log(ex);
    }
  });

  afterAll(async () => {
    try {
      await db.close();
    } catch (ex) {
      console.log(ex);
    }
  });

  test('GET /api/orders Gets all orders', async (done) => {
    const response = await request.get('/api/orders').set({ authorization: token });
    expect(JSON.parse(response.text).length).toBe(3);
    done();
  });

  test('GET /api/orders/:userId Gets all orders from a user', async (done) => {
    const response = await request.get('/api/orders/2').set({ authorization: token });

    expect(JSON.parse(response.text).length).toBe(2);
    done();
  });

  test('PUT /api/orders/:id Updates an order to be fulfilled', async (done) => {
    const response = await request
      .put('/api/orders/2')
      .send({ status: 'Fulfilled' })
      .set({ authorization: token });

    expect(JSON.parse(response.text).status).toBe('Fulfilled');
    done();
  });
});
