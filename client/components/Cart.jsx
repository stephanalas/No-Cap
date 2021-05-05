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
      user: {}
    };
    this.handleToken = this.handleToken.bind(this);
    //this.updateCart = this.updateCart.bind(this);
  }

  async componentDidMount() {
    try {  
      //this.props.getUser();
      //this.setState({})
      this.props.getUser();
      this.props.loadCart(this.props.user.id);
      console.log(this.props.cart.total, 'cart total');
      this.setState({
        ...this.state,
        cartTotal: this.props.cart.total,
        user: this.props.user
      })
      // if(this.props.cart.cart_line_items){
      //   if(this.props.cart.cart_line_items){
      //     let total = this.props.cart.cart_line_items.reduce((accum, next) => {
      //       return accum + parseFloat(next.subTotal);
      //     }, 0);
      //     this.setState({
      //       ...this.state,
      //       cart: this.props.cart,
      //       totalAmt: this.props.cart.cart_line_items.length,
      //       cartTotal: total,
      //     });
      //   }
      //}

      //const cart = await axios.get(`/api/users/${this.props.user.id}/cart`);
      console.log(this.props, 'from axios');
      
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
   
    if(prevProps.cart.total !== this.props.cart.total){
      this.setState({
        ...this.state,
        cartTotal: this.props.cart.total
      })
    }
   
    if(this.props.user !== this.state.user){
      this.setState({
        ...this.state,
        user: this.props.user
      })
    }

    if(prevState.cart.id !== this.props.cart.id){
      this.props.getUser();
      this.setState({
        cart: this.props.cart,
        totalAmt: this.props.cart.cart_line_items.length,
      })
    }

    // if (prevProps.user.id !== this.props.user.id) {
      
    //   this.props.loadCart(this.props.user.id);
    // }
    //if there was a change in cart line items
    //console.log(prevProps, 'prev props');
    //console.log(prevState, 'prev state');



    // if(this.props.cart.cart_line_items){
    //   console.log('in here with this.props');
    // }

    //{
    //     let total = this.props.cart.cart_line_items.reduce((accum, next) => {
    //       return accum + parseFloat(next.subTotal);
    //     }, 0);
    //     this.setState({
    //       cart: this.props.cart,
    //       totalAmt: this.props.cart.cart_line_items.length,
    //       cartTotal: total,
    //     });
    //   }

    // if(prevState){
    //   console.log(prevState, 'prevState');
    //   console.log(prevProps, 'prevprops');
    //   console.log(this.state, 'this.state');
    //   console.log(this.props, 'props');


    // }
      //if there was a change in cart quantities 
      // if(prevProps.cart.cart_line_items && this.state.cart.cart_line_items){
      //   let oldTotal =  this.state.cart.cart_line_items.reduce((accum, next) => {
      //     return accum + parseFloat(next.subTotal);
      //   }, 0);
      //   let newTotal =  this.props.cart.cart_line_items.reduce((accum, next) => {
      //     return accum + parseFloat(next.subTotal);
      //   }, 0);
      //   if(oldTotal !== newTotal){
      //     this.setState({
      //       cart: this.props.cart,
      //       totalAmt: this.props.cart.cart_line_items.length,
      //       cartTotal: newTotal,
      //     });
      //   }
      // } 

  }
  
  // updateCart(){
  //   //this.props.loadCart(this.props.user.id);
  // }

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
    const {updateCart} = this;
    // console.log(this.props.cart.cart_line_items, 'cart line items');
    // let newcartTotal;
  //   if(!this.props.cart){
  //     this.props.getUser();
  //     this.props.loadCart(this.props.user.id);
  //   newcartTotal = this.props.cart.cart_line_items.reduce((acc, val)=>{
  //     return (acc + (val.subTotal * 1));
  //   }, 0);
    
  // }
    
  // console.log(newcartTotal, 'total');
    return cart_line_items ? (
      <div>
        <div><h3>Cart <span className="cart-amt">{totalAmt}</span></h3></div>
        <ToastContainer />
        <div id="cart-list">
          <ul className = 'cart-container1'>
            {cart_line_items.map((cartItem) => (
              <CartLineItem key={cartItem.id} cartLineItem = {cartItem} cartTotal={cartTotal} />
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
    cart: state.cart,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId) => dispatch(loadCart(userId)),
    removeCartItem: (cartId, lineId) => dispatch(removeCartItem(cartId, lineId)),
      updateCartItem: (cartLineId, quantity, cartId, userId)=> dispatch(updateCartItem(cartLineId, quantity, cartId, userId)),
        getUser: () => dispatch(getUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
