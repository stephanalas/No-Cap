import { GET_USER_ORDERS } from '../storeComponents/getUserOrders';

const orderReducer = (state = [], action) => {
  if (action.type === GET_USER_ORDERS) {
    return action.orders;
  }
  return state;
};

export default orderReducer;
