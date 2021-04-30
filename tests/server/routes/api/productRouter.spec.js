/* eslint no-undef: 'off' */

// const supertest = require('supertest');
// const app = require('../../../../server/app');

// const request = supertest(app);
// const { db } = require('../../../../server/db/index');

// const {
//   models: { Product },
// } = require('../../../../server/db/models/associations');

// describe('Product Routes', () => {
//   beforeAll(async () => {
//     await Product.sync({ force: true });
//     await Product.bulkCreate([
//       {
//         name: 'Black Fedora',
//         price: 9.99,
//       },
//       {
//         name: 'Red Beanie',
//         price: 15.0,
//       },
//     ]);
//   });
//   test('GET /api/products length', async (done) => {
//     const response = await request.get('/api/products');
//     expect(JSON.parse(response.text).length).toBe(2);
//     done();
//   });
//   test('GET /api/products find', async (done) => {
//     let response = await request.get('/api/products');
//     response = JSON.parse(response.text);
//     const hat = response.filter((item) => item.name === 'Black Fedora');
//     expect(hat[0].name).toBe('Black Fedora');
//     done();
//   });
//   test('GET /api/products/:id find', async (done) => {
//     let response = await request.get('/api/products/2');
//     response = JSON.parse(response.text);
//     expect(response.name).toBe('Red Beanie');
//     done();
//   });

//   test('POST /api/products creates a new product', async (done) => {
//     const productData = {
//       name: 'Conductor hat',
//       price: 29.99,
//     };
//     let response = await request.post('/api/products').send(productData);
//     response = JSON.parse(response.text);
//     expect(response.name).toBe(productData.name);
//     done();
//   });

//   test('PUT /api/products/:id updates a product with id', async (done) => {
//     // requires post route to work
//     const productData = {
//       name: 'Lit Hat',
//       price: '999.9',
//     };
//     let response = await request.post('/api/products').send(productData);
//     const product = JSON.parse(response.text);
//     const newName = 'Lame Hat';
//     const newPrice = '0.01';
//     productData.name = newName;
//     productData.price = newPrice;

//     response = await request
//       .put(`/api/products/${product.id}`)
//       .send(productData);
//     response = JSON.parse(response.text);
//     const { name, price } = response;
//     expect(name).toBe(productData.name);
//     expect(price).toBe(productData.price);
//     done();
//   });

//   test('DELETE /api/products/:id deletes a product', async (done) => {
//     const productData = {
//       name: 'A short-lived hat',
//       price: 9999.99,
//     };
//     let response = await request.post('/api/products').send(productData);
//     product = JSON.parse(response.text);
//     response = (await request.delete(`/api/products/${product.id}`)).status;
//     expect(response).toEqual(204);
//     done();
//   });
//   afterAll(async () => {
//     await db.close();
//   });
// });
