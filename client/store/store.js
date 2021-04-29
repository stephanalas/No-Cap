import { createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import megaReducer from './reducers/megaReducer';

const store = createStore(megaReducer, applyMiddleware(thunks, loggingMiddleware)); // createStore expects one argument which is the reducer.

export default store;
