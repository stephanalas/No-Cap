import { GET_USERS } from '../storeComponents/getUsers';

const usersReducer = (state = [], action) => {
  if (action.type === GET_USERS) {
    return [...action.users];
  }
  return state;
};
export default usersReducer;
