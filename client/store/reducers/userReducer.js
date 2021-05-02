import { CREATE_USER } from '../storeComponents/createUser';
import { REGISTER_USER } from '../storeComponents/registerUser';
import { LOGIN_USER } from '../storeComponents/loginUser';
import { TOGGLE_ROLE } from '../storeComponents/toggleRole';

const userReducer = (state = {}, action) => {
  if (action.type === CREATE_USER) {
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
  return state;
};
export default userReducer;
