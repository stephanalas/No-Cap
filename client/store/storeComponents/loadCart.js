/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from "axios";

// action types
const LOAD_CART = "LOAD_CART";

// action creator
const _loadCart = (cart) => ({
  type: LOAD_CART,
  cart,
});

// thunk
const loadCart = (userId, productId = "", quantity = 1) => async (dispatch) => {
  try {
    if (productId !== "") {
      const response = await axios.get(`api/products/${productId}`);
      const productToAdd = response.data;
      await axios.put(`/api/users/${userId}/Cart`, { productToAdd, quantity });
    }
    const response2 = await axios.get(`api/users/${userId}/cart`);
    const userCart = response2.data;
    dispatch(_loadCart(userCart));
  } catch (err) {
    console.log(err.response);
  }
};

export { loadCart, LOAD_CART };
