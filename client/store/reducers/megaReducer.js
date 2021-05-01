import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import userReducer from './userReducer';

const megaReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
});

export default megaReducer;
