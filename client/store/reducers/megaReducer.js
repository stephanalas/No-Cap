import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

const megaReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  products: productsReducer,
});

export default megaReducer;
