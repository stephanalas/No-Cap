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

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      totalAmt: 0,
      cartTotal: 0,
    };
    this.handleToken = this.handleToken.bind(this);
  }

  componentDidMount() {
    try {
      this.setState({
        cart: this.props.cart,
      });
    } catch (err) {
      console.log(err);
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
    const { cart_line_items } = this.props.cart;
    return cart_line_items ? (
      <div>
        <div>Cart</div>
        <ToastContainer />
        <div id="cart-lis                t">
          {cart_line_items.map((cartItem) => {
            return (
              <div className="cart-item" key={cartItem.id}>
                <img src={cartItem.product.photo} />
                <div className="cart-info">
                  <h3>{cartItem.product.name}</h3>
                  <h3>Price: {cartItem.product.price}</h3>
                  <h3>Quantity: {cartItem.quantity}</h3>
                  <h3>Total: {cartItem.subTotal}</h3>
                  <button id="delete">Remove</button>
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
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
  };
};

//export default connect(null, mapDispatchToProps)(Cart)
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
