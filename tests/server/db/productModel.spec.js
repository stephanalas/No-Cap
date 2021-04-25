/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const {
  models: { Product },
} = require("../../../server/db/models/associations");
const { db, initDB } = require("../../../server/db/index");

beforeAll(async () => {
  await initDB();
});

afterAll(() => {
  db.close();
});

it("Product model exists", async () => {
  const product = await Product.create({
    name: "Black Fedora",
    category: "Fedora",
    price: 15.0,
    inventory: 3,
    color: "Black",
  });
  expect(product.name).toBe("Black Fedora");
});
