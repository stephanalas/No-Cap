import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import cartReducer from './cartReducer';
import reviewReducer from './reviewReducer';
import errorReducer from './errorReducer';
import orderReducer from './orderReducer';

const megaReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  products: productsReducer,
  cart: cartReducer,
  reviews: reviewReducer,
  error: errorReducer,
  orders: orderReducer,
});

export default megaReducer;
