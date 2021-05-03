import { LOAD_CART } from '../storeComponents/loadCart';
import { LOGIN_USER } from '../storeComponents/loginUser';
import { REMOVE_CART_ITEM } from '../storeComponents/removeCartItem';

const cartReducer = (state = {}, action) => {
  if (action.type === LOAD_CART) {
    return action.cart;
  }
  if (action.type === LOGIN_USER) {
    console.log(action.user);
    return action.user.cart;
  }
  if (action.type === REMOVE_CART_ITEM) {
    return action.cart;
  }
  return state;
};
export default cartReducer;
