import { LOAD_CART } from '../storeComponents/loadCart';
import { REMOVE_CART_ITEM } from '../storeComponents/removeCartItem';
import { UPDATE_CART_ITEM } from '../storeComponents/updateCartItem';

const cartReducer = (state = {}, action) => {
  if (action.type === LOAD_CART) {
    return action.cart;
  }
  if (action.type === REMOVE_CART_ITEM) {
    return action.cart;
  }
  if (action.type === UPDATE_CART_ITEM) {
    return action.cart;
  }
  return state;
};
export default cartReducer;
