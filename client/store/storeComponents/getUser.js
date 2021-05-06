/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';
import faker from 'faker';
// action type
const GET_USER = 'GET_USER';
// action creator
const _getUser = (user) => ({
  type: GET_USER,
  user,
});

// thunk
const getUser = () => async (dispatch) => {
  try {
    let token = window.localStorage.getItem('token');
    let authenticatedUser;
    if (token) {
      authenticatedUser = await axios.get('/api/login/auth', {
        headers: {
          authorization: token,
        },
      });
    }

    if (authenticatedUser.data === 'JsonWebTokenError') {
      console.log('received an old JWT');
      const anonUser = {
        email: faker.internet.email(),
        firstName: 'Anonymous',
        lastName: 'User',
        password: faker.internet.password(),
      };
      const response = await axios.post('/api/register', anonUser);
      token = response.data.token;
      window.localStorage.clear();
      window.localStorage.setItem('token', token);
      if (token) {
        authenticatedUser = await axios.get('/api/login/auth', {
          headers: {
            authorization: token,
          },
        });
      }
      console.log(authenticatedUser);
      delete authenticatedUser.password;
      dispatch(_getUser(authenticatedUser.data));
    } else {
      console.log(authenticatedUser.data);
      delete authenticatedUser.data.password;
      dispatch(_getUser(authenticatedUser.data));
    }
  } catch (err) {
    console.log(err);
  }
};

export { getUser, GET_USER };
