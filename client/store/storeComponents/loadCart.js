/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';
import getToken from '../../components/utils/getToken';

// action types
const LOAD_CART = 'LOAD_CART';

// action creator
const _loadCart = (cart) => ({
  type: LOAD_CART,
  cart,
});

// thunk
const loadCart = (userId, productId = '', quantity = 1) => async (dispatch) => {
  try {
    if (productId !== '') {
      const response = await axios.get(`api/products/${productId}`, getToken());
      const payload = {
        quantity,
        headers: getToken().headers,
        productToAdd: response.data,
      };
      await axios.put(`/api/users/${userId}/Cart`, payload);
    }
    const response2 = await axios.get(`api/users/${userId}/cart`, getToken());
    const userCart = response2.data;

    dispatch(_loadCart(userCart));
  } catch (err) {
    console.log(err.response);
  }
};

export { loadCart, LOAD_CART };
