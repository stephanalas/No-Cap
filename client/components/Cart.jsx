/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import CartLineItem from "./CartLineItem";
import "./styles/Cart.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { loadCart } from "../store/storeComponents/loadCart";
import "react-toastify/dist/ReactToastify.css";
import { removeCartItem } from "../store/storeComponents/removeCartItem";
import { updateCartItem } from '../store/storeComponents/updateCartItem';
import { getUser } from '../store/storeComponents/getUser';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: {},
      cartTotal: 0,
      totalAmt: 0,
    };
    this.handleToken = this.handleToken.bind(this);
  }

  componentDidMount() {
    try {

      const token = window.localStorage.getItem("token");
      if (token) {
        console.log('theres a token');
        this.props.getUser();
        //this.props.loadCart(this.props.user.id);
      }
      console.log(this.state, 'state in componentdidmount');
      console.log(this.props, 'props in componentdidmount');
      if(this.props.cart.cart_line_items){
        if(this.props.cart.cart_line_items){
          let total = this.props.cart.cart_line_items.reduce((accum, next) => {
            return accum + parseFloat(next.subTotal);
          }, 0);
          this.setState({
            ...this.state,
            cart: this.props.cart,
            totalAmt: this.props.cart.cart_line_items.length,
            cartTotal: total,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, 'prevprops in didupdate');
    if(prevProps.cart.cart_line_items){
      if (
        prevProps.cart.cart_line_items.length !==
        this.props.cart.cart_line_items.length
      ) {
          let total = this.props.cart.cart_line_items.reduce((accum, next) => {
            return accum + parseFloat(next.subTotal);
          }, 0);
          this.setState({
            cart: this.props.cart,
            totalAmt: this.props.cart.cart_line_items.length,
            cartTotal: total,
          });
        }
        if(prevProps.cart.cart_line_items && this.state.cart.cart_line_items){
          let oldTotal =  this.state.cart.cart_line_items.reduce((accum, next) => {
            return accum + parseFloat(next.subTotal);
          }, 0);
          let newTotal =  this.props.cart.cart_line_items.reduce((accum, next) => {
            return accum + parseFloat(next.subTotal);
          }, 0);
          if(oldTotal !== newTotal){
            this.setState({
              cart: this.props.cart,
              totalAmt: this.props.cart.cart_line_items.length,
              cartTotal: newTotal,
            });
          }
        } 
    }
    else{
      this.props.getUser();
    }
  }
  

  async handleToken(token, addresses) {
    try {
      const { cartTotal } = this.state;
      const response = await axios.post("/api/orders/checkout", {
        token,
        addresses,
        cartTotal,
      });
      const status = response.data;
      if (status === "success") {
        toast("Your order went through! Check email for details.", {
          type: "success",
        });
      } else {
        toast("There was an error placing your order. Please try again.", {
          type: "error",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  

  render() {
    const { cart_line_items } = this.state.cart;
    const { totalAmt, cartTotal } = this.state;
    return cart_line_items ? (
      <div>
        <div><h3>Cart <span className="cart-amt">{totalAmt}</span></h3></div>
        <ToastContainer />
        <div id="cart-list">
          <ul className = 'cart-container1'>
            {cart_line_items.map((cartItem) => (
              <CartLineItem key={cartItem.id} cartLineItem = {cartItem} />
            ))}
          </ul>
        </div>
        <div className = 'checkout'>
          <h3>Total: ${cartTotal.toFixed(2)}</h3>
        </div>
        <StripeCheckout
          stripeKey="pk_test_51ImrllFdJ30zvHzoB68wryuf9eFrZxnuVWhUaUW0eFCvTMB0MQFZIqpZG7h3E6la7LCbjV85MN95VUotf1eQEEVW00XYb4Fuop"
          token={this.handleToken}
          billingAddress
          shippingAddress
          amount={this.state.cartTotal * 100}
          name="NoCap Order"
        />
      </div>
    ) : (
      <div>
      <h2>No items in the cart, go shop!</h2>
    </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId) => dispatch(loadCart(userId)),
    removeCartItem: (cartId, lineId) => dispatch(removeCartItem(cartId, lineId)),
      updateCartItem: (cartLineId, quantity, cartId)=> dispatch(updateCartItem(cartLineId, quantity, cartId)),
        getUser: () => dispatch(getUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
