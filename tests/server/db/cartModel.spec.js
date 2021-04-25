/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const { db, initDB } = require('../../../server/db/index');
const Cart = require('../../../server/db/models/Cart');

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  db.close();
});

it('Cart Model exists', async () => {
  const cart = await Cart.create({});
  expect(cart.id).toBe(1);
});
