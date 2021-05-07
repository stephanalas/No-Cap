/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */
import axios from 'axios';
import getToken from '../../components/utils/getToken';
// action types
const ADD_REVIEW = 'ADD_REVIEW';
// action creator
const _addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});
// thunk
const addReview = (productId, userId, stars, body) => async (dispatch) => {
  try {
    const payload = {
      productId,
      userId,
      stars,
      body,
      headers: getToken().headers,
    };

    let newReview = await axios.post('api/reviews', payload);
    newReview = newReview.data;
    dispatch(_addReview(newReview));
    window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { addReview, ADD_REVIEW };
