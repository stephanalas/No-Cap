/* eslint no-undef: 'off' */

const supertest = require('supertest');
const app = require('../../../../server/app');

const request = supertest(app);
const { db, initDB } = require('../../../../server/db/index');

const {
  models: {
    User, Order, OrderLineItem, Product, CartLineItem,
  },
} = require('../../../../server/db/models/associations');

describe('Orders Routes', () => {
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
        name: 'bad hat',
        category: 'Fez',
        price: 5.00,
        inventory: 20,
        color: 'Black',
      });
      await Product.create({
        name: 'bowler hat',
        category: 'Fedora',
        price: 10.00,
        inventory: 20,
        color: 'Black',
      });
      await Product.create({
        name: 'classy hat',
        category: 'Fedora',
        price: 15.00,
        inventory: 20,
        color: 'Black',
      });
      await Order.bulkCreate([
        {
            userId: 1,
            total: 30.00
        },
        {
            userId: 2,
            total: 50.00
        },
        {
            userId: 2,
            total: 15.00
        },
      ]);
      await OrderLineItem.bulkCreate([
          {
            orderId: 1,
            unitPrice: 5.00,
            productId: 1,
            quantity: 2,
            subTotal: 10.00,
        },
        {
            orderId: 1,
            unitPrice: 10.00,
            productId: 2,
            quantity: 2,
            subTotal: 20.00,
        },
        {
            orderId: 2,
            unitPrice: 15.00,
            productId: 3,
            quantity: 1,
            subTotal: 15.00,
        },
        {
            orderId: 2,
            unitPrice: 10.00,
            productId: 2,
            quantity: 2,
            subTotal: 20.00,
        },
        {
            orderId: 2,
            unitPrice: 15.00,
            productId: 3,
            quantity: 1,
            subTotal: 15.00,
        },
        {
            orderId: 3,
            unitPrice: 5.00,
            productId: 1,
            quantity: 3,
            subTotal: 15.00,
        },
        ]);
      
    });
    test('GET /api/orders Gets all orders', async (done) => {
      const response = await request.get('/api/orders');
      expect(JSON.parse(response.text).length).toBe(3);
      done();
    });

    test('GET /api/orders/:id Gets all orders from a user', async (done) => {
        const response = await request.get('/api/orders/2');
        console.log(response.text);
        expect(JSON.parse(response.text).length).toBe(2);
        done();
      });
    
    afterAll(async () => {
      await db.close();
    });
  });