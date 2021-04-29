import axios from 'axios';

// action type
const CREATE_USER = 'CREATE_USER';
// action creator
const _createUser = (user) => ({ type: CREATE_USER, user });
// thunk
const createUser = (user) => async (dispatch) => {
  const { data } = axios.post('/login', user); //might need await here. putting in await gets rid of action console log though
  dispatch(_createUser(data));
};

export { createUser, CREATE_USER };
