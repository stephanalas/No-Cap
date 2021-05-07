/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';
import getToken from '../../components/utils/getToken';

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
    const authenticatedUser = await axios.get('/api/login/auth', getToken());
    delete authenticatedUser.data.password;
    dispatch(_registerUser(authenticatedUser.data));
  } catch (err) {
    console.log(err.response);
  }
};

export { registerUser, REGISTER_USER };
