import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import cartReducer from './cartReducer';

const megaReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  products: productsReducer,
  cart: cartReducer,
});

export default megaReducer;
