import { CREATE_USER } from '../storeComponents/createUser';
import { GET_USER } from '../storeComponents/getUser';
import { REGISTER_USER } from '../storeComponents/registerUser';
import { LOGIN_USER } from '../storeComponents/loginUser';
import { TOGGLE_ROLE } from '../storeComponents/toggleRole';
import { LOGOUT_USER } from '../storeComponents/logoutUser';
import { UPDATE_USER } from '../storeComponents/updateUser';
import { DELETE_USER } from '../storeComponents/deleteUser';

const userReducer = (state = {}, action) => {
  if (action.type === CREATE_USER) {
    return { ...state, ...action.user };
  }
  if (action.type === GET_USER) {
    return { ...state, ...action.user };
  }
  if (action.type === LOGIN_USER) {
    return { ...state, ...action.user };
  }
  if (action.type === REGISTER_USER) {
    return { ...state, ...action.user };
  }
  if (action.type === TOGGLE_ROLE) {
    return { ...state, ...action.user };
  }
  if (action.type === UPDATE_USER) {
    return { ...state, ...action.user };
  }
  if (action.type === LOGOUT_USER) {
    return {};
  }
  if (action.type === DELETE_USER) {
    return {};
  }
  return state;
};

export default userReducer;
