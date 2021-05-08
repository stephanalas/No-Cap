import axios from 'axios';
import getToken from '../../components/utils/getToken';
const GET_USER_ORDERS = 'GET_USER_ORDERS';

const _getUserOrder = (orders) => {
  return { type: GET_USER_ORDERS, orders };
};

const getUserOrders = (userID) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/orders/${userID}`, getToken());
    const userOrders = response.data;
    dispatch(_getUserOrder(userOrders));
  };
};

export { GET_USER_ORDERS, getUserOrders };
