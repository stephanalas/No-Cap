/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const { Product } = require('../../../server/db/models/Product');
const { db, initDB } = require('../../../server/db/index');

beforeAll(async () => {
  await initDB();
});

afterAll(() => {
  db.close();
});

it('Product model exists', async () => {
  try {
    const product = await Product.create({
      name: 'Black Fedora',
      category: 'Fedora',
      price: 15.0,
      inventory: 3,
      color: 'Black',
    });
    expect(product.name).toBe('Black Fedora');
  } catch (error) {
    console.log('there was an error in Product Model test');
    console.error(error);
  }
});
