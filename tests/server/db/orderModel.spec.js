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

it('Order Model exists', async () => {
  const order = await Order.create({
    order_total: 45.5,
  });
  expect(order.order_total).toBe('45.50');
});
