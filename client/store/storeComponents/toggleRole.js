/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';
import getToken from '../../components/utils/getToken';
// action type
const TOGGLE_ROLE = 'TOGGLE_ROLE';
// action creator

const _toggleRole = (user) => ({
  type: TOGGLE_ROLE,
  user,
});

// thunk
const toggleRole = (id) => async (dispatch) => {
  try {
    const response = await axios.post(
      '/api/users/togglerole',
      {
        userId: id,
      },
      getToken(),
    );
    dispatch(_toggleRole(response.data));
  } catch (err) {
    console.log(err.response);
  }
};

export { toggleRole, TOGGLE_ROLE };
