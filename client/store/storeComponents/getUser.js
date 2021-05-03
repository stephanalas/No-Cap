/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

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
    const token = window.localStorage.getItem('token');
    let authenticatedUser;
    if (token) {
      authenticatedUser = await axios.get('/api/login/auth', {
        headers: {
          authorization: token,
        },
      });
    }
    delete authenticatedUser.data.password;
    dispatch(_getUser(authenticatedUser.data));
  } catch (err) {
    console.log(err.response);
  }
};

export { getUser, GET_USER };
