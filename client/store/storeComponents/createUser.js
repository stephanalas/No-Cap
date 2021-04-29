import thunks from 'redux-thunk';
import axios from 'axios';

// action type
const CREATE_USER = 'CREATE_USER';
// action creator
const _createUser = (user) => ({ type: CREATE_USER, user });
// thunk
const createUser = (user) => async (dispatch) => {
  const { data } = axios.post('/login', user);
  dispatch(_createUser(data))
  console.log(data)
};

export {createUser, CREATE_USER };
