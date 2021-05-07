/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../../server/app');

const request = supertest(app);
const { db, initDB } = require('../../../../server/db/index');

const {
  models: { Product, User },
} = require('../../../../server/db/models/associations');

let adminToken;
describe('Product Routes', () => {
  beforeAll(async () => {
    await initDB();

    await User.create({
      firstName: 'Joe',
      lastName: 'Shmo',
      email: 'jshmo@aol.com',
      password: 'hello123',
      role: 'Admin',
    });
    const response = await request.post('/api/login/auth').send({
      email: 'jshmo@aol.com',
      password: 'hello123',
    });
    const { token } = response.body;
    adminToken = token;

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

  afterAll(async () => {
    await db.close();
  });

  test('GET /api/products length', async (done) => {
    const response = await request.get('/api/products').set({ authorization: adminToken });
    expect(JSON.parse(response.text).length).toBe(2);
    done();
  });
  test('GET /api/products find', async (done) => {
    let response = await request.get('/api/products').set({ authorization: adminToken });
    response = JSON.parse(response.text);
    const hat = response.filter((item) => item.name === 'Black Fedora');
    expect(hat[0].name).toBe('Black Fedora');
    done();
  });
  test('GET /api/products/:id find', async (done) => {
    let response = await request.get('/api/products/2').set({ authorization: adminToken });
    response = JSON.parse(response.text);
    expect(response.name).toBe('Red Beanie');
    done();
  });

  test('POST /api/products creates a new product', async (done) => {
    const productData = {
      name: 'Conductor hat',
      price: 29.99,
    };
    let response = await request
      .post('/api/products')
      .send(productData)
      .set({ authorization: adminToken });
    response = JSON.parse(response.text);
    expect(response.name).toBe(productData.name);
    done();
  });

  test('PUT /api/products/:id updates a product with id', async (done) => {
    // requires post route to work
    // const productData = {
    //   name: 'Lit Hat',
    //   price: '999.9',
    // };
    // let response = await request
    //   .post('/api/products')
    //   .send(productData)
    //   .set({ authorization: adminToken });

    // const product = JSON.parse(response.text);
    // const newName = 'Lame Hat';
    // const newPrice = '0.01';
    // productData.name = newName;
    // productData.price = newPrice;

    response = await request
      .put('/api/products/1')
      .send({ name: 'Red Fedora' })
      .set({ authorization: adminToken });
    response = JSON.parse(response.text);
    const { name } = response;
    expect(name).toBe('Red Fedora');

    done();
  });

  test('DELETE /api/products/:id deletes a product', async (done) => {
    const productData = {
      name: 'A short-lived hat',
      price: 9999.99,
    };
    let response = await request
      .post('/api/products')
      .send(productData)
      .set({ authorization: adminToken });
    product = JSON.parse(response.text);
    response = (
      await request.delete(`/api/products/${product.id}`).set({ authorization: adminToken })
    ).status;
    expect(response).toEqual(204);
    done();
  });
});
