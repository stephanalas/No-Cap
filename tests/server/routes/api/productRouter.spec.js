/* eslint no-undef: 'off' */

const supertest = require('supertest');
const app = require('../../../../server/app');

const request = supertest(app);
const { db } = require('../../../../server/db/index');

const {
  models: { Product },
} = require('../../../../server/db/models/associations');

describe('Product Routes', () => {
  beforeAll(async () => {
    await Product.sync({ force: true });
    await Product.bulkCreate([
      {
        name: 'Black Fedora',
        price: 9.99,
      },
      {
        name: 'Red Beanie',
        price: 15.0,
      },
    ]);
  });
  test('GET /api/products length', async (done) => {
    const response = await request.get('/api/products');
    expect(JSON.parse(response.text).length).toBe(2);
    done();
  });
  test('GET /api/products find', async (done) => {
    let response = await request.get('/api/products');
    response = JSON.parse(response.text);
    const hat = response.filter((item) => item.name === 'Black Fedora');
    expect(hat[0].name).toBe('Black Fedora');
    done();
  });
  test('GET /api/products/:id find', async (done) => {
    let response = await request.get('/api/products/2');
    response = JSON.parse(response.text);
    expect(response.name).toBe('Red Beanie');
    done();
  });
  afterAll(async () => {
    await db.close();
  });
});
