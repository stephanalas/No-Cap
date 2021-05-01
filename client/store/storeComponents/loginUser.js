/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

// action type
const LOGIN_USER = 'LOGIN_USER';
// action creator
const _loginUser = (user) => ({ type: LOGIN_USER, user });
// thunk
const loginUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post('/api/login/auth', user);
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
    dispatch(_loginUser(authenticatedUser.data));
  } catch (err) {
    console.log(err.response);
  }
};

export { loginUser, LOGIN_USER };
