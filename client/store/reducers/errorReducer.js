import { GET_ERROR, LOGIN_USER } from '../storeComponents/loginUser';

const errorReducer = (state = {}, action) => {
  if (action.type === GET_ERROR) {
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
  return state;
};
export default errorReducer;
