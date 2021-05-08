import { GET_USER_ORDERS } from '../storeComponents/getUserOrders';
import { GET_ALL_ORDERS } from '../storeComponents/getAllOrders';

const orderReducer = (state = [], action) => {
  if (action.type === GET_USER_ORDERS) {
    return action.orders;
  }
  if (action.type === GET_ALL_ORDERS) {
    return action.orders;
  }
  return state;
};

export default orderReducer;
