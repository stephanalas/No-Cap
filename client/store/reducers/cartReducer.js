import { LOAD_CART } from '../storeComponents/loadCart';

const cartReducer = (state = [], action) => {
  if (action.type === LOAD_CART) {
    console.log('in the reducer');
    console.log(state);
    return action.cart;
  }
  return state;
};
export default cartReducer;
