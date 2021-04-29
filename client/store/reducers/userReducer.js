import { CREATE_USER } from '../storeComponents/createUser';

const userReducer = (state = [], action) => {
  if (action.type === CREATE_USER) {
      console.log(action)
    return [...state, action.user];
  }
  return state;
};
export default userReducer;
