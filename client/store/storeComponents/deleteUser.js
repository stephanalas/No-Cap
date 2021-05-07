/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

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
    const token = window.localStorage.getItem('token');
    if (!token) {
      const error = new Error('Unauthorized');
      throw error;
    } else {
      await axios.delete(`/api/users/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_deleteUser(id));
    }
  } catch (err) {
    console.log(err.response);
  }
};

export { deleteUser, DELETE_USER };
