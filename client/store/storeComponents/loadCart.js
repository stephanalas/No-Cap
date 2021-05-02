/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

// action types
const LOAD_CART = 'LOAD_CART';

// action creator
const _loadCart = (cart) => ({
  type: LOAD_CART,
  cart,
});

// thunk
const loadCart = (userId) => async (dispatch) => {
  try {
    const response2 = await axios.get(`api/users/${userId}/cart`);
    const userCart = response2.data.cart_line_items;
    dispatch(_loadCart(userCart));
  } catch (err) {
    console.log(err.response);
  }
};

export { loadCart, LOAD_CART };
