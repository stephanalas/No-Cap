/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

// action type
const GET_USERS = 'GET_USERS';
// action creator
const _getUsers = (users) => ({
  type: GET_USERS,
  users,
});

// thunk
const getUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/users');
    const users = response.data;
    dispatch(_getUsers(users));
  } catch (err) {
    console.log('failed in getUsers thunk');
    console.log(err.response);
  }
};

export { getUsers, GET_USERS };
