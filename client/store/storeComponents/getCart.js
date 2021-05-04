// /* eslint no-underscore-dangle: 'off' */
// /* eslint no-console: 'off' */

// import axios from 'axios';

// // action types
// const GET_CART = 'GET_CART';

// // action creator
// const _getCart = (cart) => ({
//   type: GET_CART,
//   cart,
// });

// // thunk
// const getCart = () => async (dispatch) => {
//   try {
//     if (productId !== '') {
//       const response = await axios.get(`api/products/${productId}`);
//       const productToAdd = response.data;
//       await axios.put(`/api/users/${userId}/Cart`, { productToAdd, quantity });
//     }
//     const response2 = await axios.get(`api/users/${userId}/cart`);
//     const userCart = response2.data;

//     dispatch(_loadCart(userCart));
//   } catch (err) {
//     console.log(err.response);
//   }
// };

// export { loadCart, LOAD_CART };
