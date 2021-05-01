/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */
const {
  models: { Review },
} = require('../../../server/db/models/associations');
const { db, initDB } = require('../../../server/db/index');

let review;

beforeAll(async () => {
  await initDB();
});

afterAll(() => {
  db.close();
});

it('Review model exists', async (done) => {
  review = await Review.create({
    stars: 4,
  });
  expect(review.stars).toBe(4);
  done();
});
