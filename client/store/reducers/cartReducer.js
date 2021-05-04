import { LOAD_CART } from '../storeComponents/loadCart';
import { LOGIN_USER } from '../storeComponents/loginUser';
import { REMOVE_CART_ITEM } from '../storeComponents/removeCartItem';
import { UPDATE_CART_ITEM } from '../storeComponents/updateCartItem';
//import {GET_CART} from '../storeComponents/getCart';

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
  if (action.type === UPDATE_CART_ITEM) {
    let lineItems = state.cart_line_items.map(cartLineItem=> cartLineItem.id === action.cartLineItem.id ? action.cartLineItem : cartLineItem);
    state = {...state, cart_line_items : lineItems};
  }
  return state;
};
export default cartReducer;
