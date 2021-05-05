/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const { db, initDB } = require('../../../server/db/index');
const {
  models: { Cart, CartLineItem },
} = require('../../../server/db/models/associations');

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  db.close();
});

it('Cart Model exists', async (done) => {
  const cart = await Cart.create({});
  expect(cart.id).toBe(1);
  done();
});

it('Cart Model creates a total based on cart line item', async (done) => {
  const cart = await Cart.create({});
  const cartLineItem = await CartLineItem.create({
    cartId: cart.id,
    unitPrice: 25,
    quantity: 3,
  });
  await cart.update({
    cart_line_items: [cartLineItem],
  });
  // console.log(cart.cart_line_items, 'log');

  expect(cart.total).toBe(75);
  done();
});
