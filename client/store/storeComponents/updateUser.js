/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';
import getToken from '../../components/utils/getToken';

// action type
const UPDATE_USER = 'UPDATE_USER';
const GET_UPDATE_ERROR = 'GET_UPDATE_ERROR';
// action creator
const _updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});
const _getUpdateError = (error) => ({ type: GET_UPDATE_ERROR, error });

const updateUser = ({
  id, firstName, lastName, email, password, address,
}) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem('token');
    if (!token) {
      const error = new Error('Unauthorized');
      throw error;
    } else {
      const response = (
        await axios.put(
          `/api/users/${id}`,
          {
            firstName,
            lastName,
            email,
            password,
            address,
          },
          getToken(),
        )
      ).data;

      const newToken = (
        await axios.post('/api/login/auth', {
          email: user.email,
          password,
        })
      ).data.token;
      window.localStorage.clear();
      window.localStorage.setItem('token', newToken);
      delete user.password;
      console.log(user);
      dispatch(_updateUser(user));
    }
  } catch (err) {
    console.log(err.response);
    const { error } = err.response.data;
    if (error) {
      dispatch(_getUpdateError(error));
    }
  }
};

export { updateUser, UPDATE_USER, GET_UPDATE_ERROR };
