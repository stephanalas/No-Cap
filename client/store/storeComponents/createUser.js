import axios from 'axios';

// action type
const CREATE_USER = 'CREATE_USER';
// action creator
const _createUser = (user) => ({ type: CREATE_USER, user });
// thunk
const createUser = (user) => async (dispatch) => {
  try {
  // might need await here. putting in await gets rid of action console log though
    const response = await axios.post('/api/register', user);
    console.log(response.config.data);
    dispatch(_createUser(response.config.data));
  }
  catch (err) {
      console.log(err.response);
  }
};

export { createUser, CREATE_USER };
