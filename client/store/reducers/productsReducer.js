import { GET_PRODUCTS } from '../storeComponents/getProducts';

const productsReducer = (state = [], action) => {
  if (action.type === GET_PRODUCTS) {
    return action.products;
  }
  return state;
};
export default productsReducer;
