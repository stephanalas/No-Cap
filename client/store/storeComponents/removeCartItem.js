/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */
import axios from 'axios';
import getToken from '../../components/utils/getToken';

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
    const response = await axios.put(`/api/cart/${cartId}/removeCartItem`, {
      lineId,
      headers: getToken().headers,
    });
    const updatedCart = response.data;
    dispatch(_removeCartItem(updatedCart));
  } catch (err) {
    console.log(err.response);
  }
};

export { removeCartItem, REMOVE_CART_ITEM };
