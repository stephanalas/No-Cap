/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';
import faker from 'faker';
import getToken from '../../components/utils/getToken';
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
    let authenticatedUser = await axios.get('/api/login/auth', getToken());
    console.log('called after getToken: ', authenticatedUser);
    if (authenticatedUser.data === 'JsonWebTokenError') {
      const anonUser = {
        email: faker.internet.email(),
        firstName: 'Anonymous',
        lastName: 'User',
        password: faker.internet.password(),
      };
      const response = await axios.post('/api/register', anonUser);
      const { token } = response.data;
      window.localStorage.clear();
      window.localStorage.setItem('token', token);
      if (token) {
        authenticatedUser = await axios.get('/api/login/auth', {
          headers: {
            authorization: token,
          },
        });
        console.log('after get new user: ', authenticatedUser);
      }
      delete authenticatedUser.data.password;
      dispatch(_getUser(authenticatedUser.data));
    } else {
      delete authenticatedUser.data.password;
      dispatch(_getUser(authenticatedUser.data));
    }
  } catch (err) {
    console.log(err);
  }
};

export { getUser, GET_USER };
