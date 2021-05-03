/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import './styles/Cart.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { loadCart } from '../store/storeComponents/loadCart';
import 'react-toastify/dist/ReactToastify.css';
import { removeCartItem } from '../store/storeComponents/removeCartItem';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: {},
      cartTotal: '',
      totalAmt: 0,
    };
    this.handleToken = this.handleToken.bind(this);
  }

  componentDidMount() {
    try {
      this.setState({
        ...this.state,
        cart: this.props.cart,
        totalAmt: this.props.cart.cart_line_items.length,
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.cart.cart_line_items.length !==
      this.props.cart.cart_line_items.length
    ) {
      this.setState({
        cart: this.props.cart,
        totalAmt: this.props.cart.cart_line_items.length,
      });
    }
  }

  async handleToken(token, addresses) {
    try {
      const { cartTotal } = this.state;
      const response = await axios.post('/api/orders/checkout', {
        token,
        addresses,
        cartTotal,
      });
      const status = response.data;
      if (status === 'success') {
        toast('Your order went through! Check email for details.', {
          type: 'success',
        });
      } else {
        toast('There was an error placing your order. Please try again.', {
          type: 'error',
        });
      }
    } catch (error) {
      next(error);
    }
  }

  render() {
    const { removeCartItem } = this.props;
    const { cart_line_items, id } = this.state.cart;
    const { totalAmt } = this.state;
    return cart_line_items ? (
      <div>
        <div>Cart</div>
        <ToastContainer />
        <div id="cart-list">
          {cart_line_items.map((cartItem) => {
            return (
              <div className="cart-item" key={cartItem.id}>
                <img src={cartItem.product.photo} />
                <div className="cart-info">
                  <h3>{cartItem.product.name}</h3>
                  <h3>Price: {cartItem.product.price}</h3>
                  <h3>Quantity: {cartItem.quantity}</h3>
                  <h3>Total: {cartItem.subTotal}</h3>
                  <button
                    id="delete"
                    onClick={() => removeCartItem(id, cartItem.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <StripeCheckout
            stripeKey="pk_test_51ImrllFdJ30zvHzoB68wryuf9eFrZxnuVWhUaUW0eFCvTMB0MQFZIqpZG7h3E6la7LCbjV85MN95VUotf1eQEEVW00XYb4Fuop"
            token={this.handleToken}
            billingAddress
            shippingAddress
            amount={this.state.cartTotal * 100}
            name="NoCap Order"
          />
        </div>
      </div>
    ) : (
      'Loading'
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCartItem: (cartId, lineId) =>
      dispatch(removeCartItem(cartId, lineId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
