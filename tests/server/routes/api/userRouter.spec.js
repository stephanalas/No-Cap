/* eslint no-undef: 'off' */

const supertest = require('supertest');
const app = require('../../../../server/app');

const request = supertest(app);
const { db } = require('../../../../server/db/index');

const {
  models: { User, Order },
} = require('../../../../server/db/models/associations');

describe('User Routes', () => {
  beforeAll(async () => {
    // await Order.sync({ force: true });
    // await User.sync({ force: true });
    await db.sync({ force: true });
    await User.bulkCreate([
      {
        firstName: 'Joe',
        lastName: 'Shmo',
        email: 'jshmo@aol.com',
        password: 'hello123',
      },
      {
        firstName: 'Connie',
        lastName: 'Salad',
        email: 'csalad@hotmail.com',
        password: 'password',
      },
    ]);

    await Order.bulkCreate([{ userId: 2 }, { userId: 2 }]);
  });
  test('GET /api/users length', async (done) => {
    const response = await request.get('/api/users');
    expect(JSON.parse(response.text).length).toBe(2);
    done();
  });
  test('GET /api/users find', async (done) => {
    let response = await request.get('/api/users');
    response = JSON.parse(response.text);
    const user = response.filter((item) => item.firstName === 'Joe');
    expect(user[0].firstName).toBe('Joe');
    done();
  });
  test('GET /api/users/:id find', async (done) => {
    let response = await request.get('/api/users/2');
    response = JSON.parse(response.text);
    expect(response.firstName).toBe('Connie');
    done();
  });
  test('GET /api/users/:id order find', async (done) => {
    let response = await request.get('/api/users/2');
    response = JSON.parse(response.text);
    expect(response.orders.length).toBe(2);
    done();
  });

  test('POST /api/users creates a new user', async (done) => {
    const userData = {
      firstName: 'Michael',
      lastName: 'Jordan',
      email: 'mjordan@hotmail.com',
      password: 'password',
    };
    let response = await request.post('/api/users').send(userData);
    response = JSON.parse(response.text);
    expect(response.email).toBe(userData.email);
    done();
  });

  test('PUT /api/users/:id updates a user with id', async (done) => {
    // requires post route to work
    const userData = {
      firstName: 'Michael',
      lastName: 'Jordan',
      email: 'mjordan2@hotmail.com',
      password: 'password',
    };
    let response = await request.post('/api/users').send(userData);
    const user = JSON.parse(response.text);
    const newFirstName = 'Mike';
    const newEmail = 'mjordan3@hotmail.com';
    userData.firstName = newFirstName;
    userData.email = newEmail;

    response = await request.put(`/api/users/${user.id}`).send(userData);
    response = JSON.parse(response.text);
    const { firstName, email } = response;
    expect(firstName).toBe(userData.firstName);
    expect(email).toBe(userData.email);
    done();
  });

  test('DELETE /api/users/:id deletes a user', async (done) => {
    const userData = {
      firstName: 'Michael',
      lastName: 'Jordan',
      email: 'mjordan4@hotmail.com',
      password: 'password',
    };
    let response = await request.post('/api/users').send(userData);
    user = JSON.parse(response.text);
    response = (await request.delete(`/api/users/${user.id}`)).status;
    expect(response).toEqual(204);
    done();
  });

  afterAll(async () => {
    await db.close();
  });
});
