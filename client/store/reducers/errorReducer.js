import { GET_LOGIN_ERROR, LOGIN_USER } from '../storeComponents/loginUser';
import { GET_UPDATE_ERROR, UPDATE_USER } from '../storeComponents/updateUser';
import { GET_USER } from '../storeComponents/getUser';

const errorReducer = (state = {}, action) => {
  if (action.type === GET_LOGIN_ERROR) {
    if (action.error === state.message) {
      action = {
        error: 'Does your account exist? Try signing up or resetting your password',
      };
    }
    return { ...state, message: action.error };
  }
  if (action.type === LOGIN_USER) {
    return {};
  }
  if (action.type === GET_UPDATE_ERROR) {
    return { ...state, message: action.error };
  }
  if (action.type === UPDATE_USER) {
    return {};
  }
  if (action.type === GET_USER) {
    return {};
  }
  return state;
};
export default errorReducer;
