/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

// action types
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

// action creator
// const _updateCartItem = (cart) => ({
//   type: UPDATE_CART_ITEM,
//   cart,
// });
const _updateCartItem = (cartLineItem, cart) => ({
  type: UPDATE_CART_ITEM,
  cartLineItem,
  cart,
});

// thunk
const updateCartItem = (lineID, quantity, cartId, userId) => async (dispatch) => {
  try {
    const lineData = {
      lineId: lineID,
      quantity,
    };
    const response = await axios.put(`api/cart/${cartId}/updateQuantity`, lineData);
    // const userCart = response.data;
    const cart = await axios.get(`/api/users/${userId}/cart`);
    const cartLineItem = response.data;

    dispatch(_updateCartItem(cartLineItem, cart.data));
  } catch (err) {
    console.log(err.response);
  }
};

export { updateCartItem, UPDATE_CART_ITEM };
