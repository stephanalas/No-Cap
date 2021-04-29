import axios from 'axios';

// action type
const CREATE_USER = 'CREATE_USER';
// action creator
const _createUser = (user) => ({ type: CREATE_USER, user });
// thunk
const createUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post('/api/login', user); //might need await here. putting in await gets rid of action console log though
    dispatch(_createUser(response.data));
  }
  catch (err) {
      console.log(err.response);
  }
};

export { createUser, CREATE_USER };
