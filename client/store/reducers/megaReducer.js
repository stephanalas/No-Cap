import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import cartReducer from './cartReducer';
import reviewReducer from './reviewReducer';
import errorReducer from './errorReducer';

const megaReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  products: productsReducer,
  cart: cartReducer,
  reviews: reviewReducer,
  error: errorReducer,
});

export default megaReducer;
