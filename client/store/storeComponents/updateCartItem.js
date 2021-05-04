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
const _updateCartItem = (cartLineItem) => ({
    type: UPDATE_CART_ITEM,
    cartLineItem,
  });

// thunk
const updateCartItem = (lineID, quantity, cartId) => async (dispatch) => {
  try {
        let lineData = {
            lineId: lineID,
            quantity: quantity
        }
    const response = await axios.put(`api/cart/${cartId}/updateQuantity`, lineData);
    //const userCart = response.data;
    const cartLineItem = response.data;

    dispatch(_updateCartItem(cartLineItem));
  } catch (err) {
    console.log(err.response);
  }
};

export { updateCartItem, UPDATE_CART_ITEM };
