import { combineReducers } from 'redux';
import userReducer from './userReducer';

const megaReducer = combineReducers({
  users: userReducer,
});

export default megaReducer;
