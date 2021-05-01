/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

// action type
const CREATE_USER = 'CREATE_USER';
// action creator
const _createUser = (user) => ({
  type: CREATE_USER,
  user,
});

// thunk
const createUser = (user) => async (dispatch) => {
  try {
    // might need await here. putting in await gets rid of action console log though
    const response = await axios.post('/api/register', user);
    const { token } = response.data;

    window.localStorage.setItem('token', token);
    let authenticatedUser;
    if (token) {
      authenticatedUser = await axios.get('/api/login/auth', {
        headers: {
          authorization: token,
        },
      });
    }
    delete authenticatedUser.data.password;
    dispatch(_createUser(authenticatedUser.data));
  } catch (err) {
    console.log(err.response);
  }
};

export { createUser, CREATE_USER };
