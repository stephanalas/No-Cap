/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const { db, initDB } = require('../../../server/db/index');
const {
  models: { Order },
} = require('../../../server/db/models/associations');

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  db.close();
});

it('Order Model exists', async (done) => {
  const order = await Order.create({
    total: 45.5,
  });
  expect(order.total).toBe('45.50');
  expect(order.status).toBe('Processing');
  done();
});

it('Order Model has a status which can be updated', async (done) => {
  const order = await Order.create({
    total: 45.5,
  });
  await order.update({ status: 'Fulfilled' });
  expect(order.total).toBe('45.50');
  expect(order.status).toBe('Fulfilled');
  done();
});
