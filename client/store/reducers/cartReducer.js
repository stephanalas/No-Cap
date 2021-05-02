import { LOAD_CART } from "../storeComponents/loadCart";
import { LOGIN_USER } from "../storeComponents/loginUser";
import { ADD_TO_CART } from "../storeComponents/addToCart";

const cartReducer = (state = {}, action) => {
  if (action.type === LOAD_CART) {
    return action.cart;
  }
  if (action.type === LOGIN_USER) {
    console.log(action.user);
    return action.user.cart;
  }
  if (action.type === ADD_TO_CART) {
    console.log(action);
    return {
      ...state,
      cart_line_items: [...state.cart_line_items, action.cartLineItem],
    };
  }
  return state;
};
export default cartReducer;
