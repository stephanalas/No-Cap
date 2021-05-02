/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

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
    const response = await axios.post('/api/users/togglerole', { userId: id });
    dispatch(_toggleRole(response.data));
  } catch (err) {
    console.log(err.response);
  }
};

export { toggleRole, TOGGLE_ROLE };
