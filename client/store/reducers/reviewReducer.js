import { ADD_REVIEW } from '../storeComponents/addReview';

const reviewReducer = (state = [], action) => {
  if (action.type === ADD_REVIEW) {
    return [...state, action.review];
  }
  return state;
};
export default reviewReducer;
