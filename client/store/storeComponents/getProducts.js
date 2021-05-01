/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

// action type
const GET_PRODUCTS = 'GET_PRODUCTS';
// action creator
const _getProducts = (products) => ({
  type: GET_PRODUCTS,
  products,
});

// thunk
const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/products');
    const products = response.data;
    dispatch(_getProducts(products));
  } catch (err) {
    console.log('failed in getProducts thunk');
    console.log(err.response);
  }
};

export { getProducts, GET_PRODUCTS };
