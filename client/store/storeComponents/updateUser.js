/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

// action type
const UPDATE_USER = 'UPDATE_USER';
// action creator
const _updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

// thunk
const updateUser = ({
  id, firstName, lastName, email,
}) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem('token');
    if (!token) {
      const error = new Error('Unauthorized');
      throw error;
    } else {
      const response = await axios.put(`/api/users/${id}`, {
        firstName,
        lastName,
        email,
        headers: {
          authorization: token,
        },
      });
      const { newToken } = response.data;
      window.localStorage.setItem('token', newToken);
      let authenticatedUser;
      if (newToken) {
        authenticatedUser = await axios.get('/api/login/auth', {
          headers: {
            authorization: newToken,
          },
        });
      }
      delete authenticatedUser.data.password;
      dispatch(_updateUser(authenticatedUser.data));
    }
  } catch (err) {
    console.log(err.response);
  }
};

export { updateUser, UPDATE_USER };
