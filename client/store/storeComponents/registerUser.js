/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

// action type
const REGISTER_USER = 'REGISTER_USER';
// action creator
const _registerUser = (user) => ({
  type: REGISTER_USER,
  user,
});

// thunk
const registerUser = (user) => async (dispatch) => {
  try {
    // might need await here. putting in await gets rid of action console log though
    const response = await axios.put('/api/register', user);
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
    dispatch(_registerUser(authenticatedUser.data));
  } catch (err) {
    console.log(err.response);
  }
};

export { registerUser, REGISTER_USER };
