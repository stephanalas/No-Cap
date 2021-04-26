/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const { db, initDB } = require('../../../server/db/index');
const {
  models: { OrderLineItem },
} = require('../../../server/db/models/associations');

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  db.close();
});

it('Order Line Item model exists', async () => {
  const lineItem = await OrderLineItem.create({
    unitPrice: 40.5,
    quantity: 3,
  });
  expect(lineItem.totalPrice).toBe('121.50');
});
