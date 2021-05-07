import { GET_USERS } from '../storeComponents/getUsers';
import { DELETE_USER } from '../storeComponents/deleteUser';

const usersReducer = (state = [], action) => {
  if (action.type === GET_USERS) {
    return [...action.users];
  }
  if (action.type === DELETE_USER) {
    return [...state].filter((user) => user.id !== action.id);
  }
  return state;
};
export default usersReducer;
