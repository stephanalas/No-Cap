import axios from 'axios';
import getToken from '../../components/utils/getToken';
const GET_ALL_ORDERS = 'GET_ALL_ORDERS';

const _getAllOrders = (orders) => {
  return { type: GET_ALL_ORDERS, orders };
};

const getAllOrders = () => {
  return async (dispatch) => {
    const response = await axios.get(`/api/orders`, getToken());
    const orders = response.data;
    dispatch(_getAllOrders(orders));
  };
};

export { GET_ALL_ORDERS, getAllOrders };
