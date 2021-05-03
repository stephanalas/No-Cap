/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */
import axios from 'axios';
// action types
const ADD_TO_CART = 'ADD_TO_CART';
// action creator
const _addToCart = (cartLineItem) => ({
  type: ADD_TO_CART,
  cartLineItem,
});
// thunk
const addToCart = (productId, userID) => async (dispatch) => {
  try {
    console.log('entered thunk');
    let response = await axios.get(`api/products/${productId}`);
    const productToAdd = response.data;
    response = await axios.put(`/api/users/${userID}/Cart`, productToAdd);
  } catch (err) {
    console.log(err.response);
  }
};
export { addToCart, ADD_TO_CART };
