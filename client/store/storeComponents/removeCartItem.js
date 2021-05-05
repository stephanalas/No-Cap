/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */
import axios from 'axios';

// action types
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';

// action creator
const _removeCartItem = (cart) => ({
  type: REMOVE_CART_ITEM,
  cart,
});

// thunk
const removeCartItem = (cartId, lineId) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/cart/${cartId}/removeCartItem`, { lineId });

    const updatedCart = response.data;
    console.log(updatedCart);
    dispatch(_removeCartItem(updatedCart));
  } catch (err) {
    console.log(err.response);
  }
};

export { removeCartItem, REMOVE_CART_ITEM };
