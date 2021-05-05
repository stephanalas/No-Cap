/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */
import axios from 'axios';
// action types
const ADD_REVIEW = 'ADD_REVIEW';
// action creator
const _addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});
// thunk
const addReview = (productId, userID, stars, body) => async (dispatch) => {
  try {
    let newReview = await axios.post('api/reviews', {
      productId,
      userID,
      stars,
      body,
    });
    newReview = newReview.data;
    dispatch(_addReview(newReview));
    // window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { addReview, ADD_REVIEW };
