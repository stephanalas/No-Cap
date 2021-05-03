import { LOAD_CART } from '../storeComponents/loadCart';
import { REMOVE_CART_ITEM } from '../storeComponents/removeCartItem';

const cartReducer = (state = {}, action) => {
  if (action.type === LOAD_CART) {
    return action.cart;
  }
<<<<<<< HEAD
  if (action.type === REMOVE_CART_ITEM) {
    return action.cart;
=======
  if (action.type === LOGIN_USER) {
    console.log(action.user);
    return action.user.cart;
>>>>>>> master
  }
  return state;
};
export default cartReducer;
