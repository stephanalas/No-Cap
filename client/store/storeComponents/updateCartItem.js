/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

// action types
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

// action creator
const _updateCartItem = (cart) => ({
  type: UPDATE_CART_ITEM,
  cart,
});

// thunk
const updateCartItem = (lineID, quantity) => async (dispatch) => {
  try {
      console.log(lineID, 'in update cart reducer');
      console.log(quantity, 'in update cart reducer');
    let lineData = {
        lineId: lineID,
        quantity: quantity
    }
    const response2 = await axios.get(`api/users/${userId}/updateQuantity`, lineData);
    const userCart = response2.data;

    dispatch(_updateCartItem(userCart));
  } catch (err) {
    console.log(err.response);
  }
};

export { updateCartItem, UPDATE_CART_ITEM };
