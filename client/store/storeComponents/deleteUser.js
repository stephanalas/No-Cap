/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';
import getToken from '../../components/utils/getToken';

// action type
const DELETE_USER = 'DELETE_USER';
// action creator
const _deleteUser = (id) => ({
  type: DELETE_USER,
  id,
});

// thunk
const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/${id}`, getToken());
    dispatch(_deleteUser(id));
  } catch (err) {
    console.log(err.response);
  }
};

export { deleteUser, DELETE_USER };
