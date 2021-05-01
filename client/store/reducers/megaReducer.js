import { combineReducers } from 'redux';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

const megaReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default megaReducer;
