/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';
import getToken from '../../components/utils/getToken';

// action type
const LOGIN_USER = 'LOGIN_USER';
const GET_ERROR = 'GET_ERROR';
// action creators
const _loginUser = (user) => ({ type: LOGIN_USER, user });
const _getError = (error) => ({ type: GET_ERROR, error });
// thunk
const loginUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post('/api/login/auth', user);
    const { token, error } = response.data;
    let authenticatedUser;
    if (error) {
      dispatch(_getError(error));
    } else if (token) {
      window.localStorage.setItem('token', token);
      authenticatedUser = await axios.get('/api/login/auth', getToken());
    }
    delete authenticatedUser.data.password;
    dispatch(_loginUser(authenticatedUser.data));
  } catch (err) {
    console.log(err.response);
  }
};

export { loginUser, LOGIN_USER, GET_ERROR };
