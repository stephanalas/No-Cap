import { CREATE_USER } from '../storeComponents/createUser';
import { LOGIN_USER } from '../storeComponents/loginUser';

const userReducer = (state = {}, action) => {
  if (action.type === CREATE_USER) {
    return { ...state, user: action.user };
  }
  if (action.type === LOGIN_USER) {
    return { ...state, user: action.user };
  }
  return state;
};
export default userReducer;
