const CLEAR_CART = 'CLEAR_CART';

const _clearCart = () => {
  return { type: CLEAR_CART };
};

const clearCart = () => {
  return async (dispatch) => {
    dispatch(_clearCart());
  };
};

export { clearCart, CLEAR_CART };
