import { combineReducers } from 'redux';
import userReducer from './userReducer';

const megaReducer = combineReducers({
  user: userReducer,
});

export default megaReducer;
