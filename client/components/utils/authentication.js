/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

const authentication = async (token) => {
  try {
    const response = (
      await axios.get('/api/users/auth', {
        headers: {
          authorization: token,
        },
      })
    ).data;
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export default authentication;
