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
    // const response = await axios.get(`/${userId}/cart`);
    // dispatch(_loadCart(response.data));
    // const user = User.findByPk(userId);
    // user.getCart();

    const response2 = await axios.get(`api/users/${userId}/cart`);
    const userCart = response2.data.cart_line_items;
    /*
    window.localStorage.setItem('token', token);
    let response;
    if (token) {
      console.log("in here again");
      response = await axios.get(`/${userId}/cart`, {
        headers: {
          authorization: token,
        },
      });
      console.log(response,'stuff');
    }
*/
    dispatch(_loadCart(userCart));
  } catch (err) {
    console.log(err.response);
  }
};

export { loadCart, LOAD_CART };
