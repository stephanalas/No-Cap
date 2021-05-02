/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action type
const LOGOUT_USER = 'LOGOUT_USER';
// action creator
const logoutUser = () => ({ type: LOGOUT_USER });

export { logoutUser, LOGOUT_USER };
