/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../../server/app');

const request = supertest(app);
const { db, initDB } = require('../../../../server/db/index');

const {
  models: {
    User, Order, Product, Review,
  },
} = require('../../../../server/db/models/associations');

describe('Review Routes', () => {
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
    await Order.bulkCreate([{ userId: 2 }, { userId: 2 }]);
    await Review.create({
      productId: 1,
      userId: 2,
      stars: 5,
      body: 'What a great hat!',
    });
  });

  afterAll(async () => {
    await db.close();
  });

  test('GET /api/reviews/:id', async (done) => {
    const body = 'What a great hat!';
    const stars = 5;
    const id = 1;
    const response = await request.get(`/api/reviews/${id}`);
    const data = JSON.parse(response.text);

    expect(data.stars).toBe(stars);
    expect(data.body).toBe(body);
    done();
  });
  afterAll(async () => {
    await db.close();
  });

  test('PUT /api/reviews/:id', async (done) => {
    const body = 'What a terrible hat!';
    const stars = 0;
    const id = 1;
    const response = await request.put(`/api/reviews/${id}`).send({
      body,
      stars,
      userId: 1,
      productId: 1,
    });
    const data = JSON.parse(response.text);

    expect(data.stars).toBe(stars);
    expect(data.body).toBe(body);
    done();
  });

  test('DELETE /api/reviews/:id', async (done) => {
    const id = 1;
    const response = (await request.delete(`/api/reviews/${id}`)).status;
    expect(response).toBe(204);

    done();
  });
});
