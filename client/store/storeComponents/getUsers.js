/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';
import getToken from '../../components/utils/getToken';

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
    const users = await axios.get('/api/users', getToken());
    dispatch(_getUsers(users.data));
  } catch (error) {
    console.error('error in getUsers thunk!');
  }
};

export { getUsers, GET_USERS };
