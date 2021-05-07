/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';
import getToken from '../../components/utils/getToken';

// action type
const UPDATE_USER = 'UPDATE_USER';
// action creator
const _updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

// thunk
const updateUser = ({
  id,
  firstName,
  lastName,
  email,
  password,
  address,
}) => async (dispatch) => {
  try {
    const user = (
      await axios.put(`/api/users/${id}`, {
        firstName,
        lastName,
        email,
        password,
        address,
        headers: getToken().headers,
      })
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
  } catch (err) {
    console.log(err.response);
  }
};

export { updateUser, UPDATE_USER };
