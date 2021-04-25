/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const { db, initDB } = require('../../../server/db/index');
const CartLineItem = require('../../../server/db/models/CartLineItem');

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  db.close();
});

it('Cart Line Item model exists', async () => {
  const lineItem = await CartLineItem.create({
    unitPrice: 40.5,
    quantity: 3,
  });
  expect(lineItem.totalPrice).toBe('121.50');
});
