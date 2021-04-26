/* eslint no-undef: 'off' */

const app = require('supertest')(require('../../../server/app'));

describe('Routes', () => {
  test('GET /', async (done) => {
    const response = await app.get('/');
    expect(response.status).toBe(200);
    done();
  });
});
