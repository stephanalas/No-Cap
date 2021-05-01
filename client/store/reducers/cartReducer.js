import { LOAD_CART } from '../storeComponents/loadCart';

const cartReducer = (state = [], action) => {
  if (action.type === LOAD_CART) {
    return action.cart;
  }
  return state;
};
export default cartReducer;
