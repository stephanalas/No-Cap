/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

const authentication = async (token) => {
  let response;
  try {
    response = (
      await axios.get('/api/users/auth', {
        headers: {
          authorization: token,
        },
      })
    ).data;
    // console.log('this is in the function', response);
  } catch (err) {
    console.log(err.response);
  }
  return response;
};

export default authentication;
