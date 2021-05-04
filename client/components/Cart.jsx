/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import "./styles/Cart.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { loadCart } from "../store/storeComponents/loadCart";
import "react-toastify/dist/ReactToastify.css";
import { removeCartItem } from "../store/storeComponents/removeCartItem";
import { updateCartItem } from '../store/storeComponents/updateCartItem';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: {},
      cartTotal: 0,
      totalAmt: 0,
    };
    this.handleToken = this.handleToken.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    try {
<<<<<<< HEAD
        this.setState({ 
            ...this.state, 
            cart: this.props.cart, 
        });
=======
      let total = this.props.cart.cart_line_items.reduce((accum, next) => {
        console.log(accum);
        return accum + parseFloat(next.subTotal);
      }, 0);
      this.setState({
        ...this.state,
        cart: this.props.cart,
        totalAmt: this.props.cart.cart_line_items.length,
        cartTotal: total,
      });
>>>>>>> master
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

  onInputChange(event, lineItemId) {
    const {updateCartItem} = this.props;
    this.setState({...this.state, ...this.state.cart.cart_line_items[lineItemId].quantity = event.target.value})
    //console.log(this.state.cart.cart_line_items[cartId].quantity);
    //this.setState({this.state.cart.cart_line_items[cartId].quantity : ...event.target.value})
    //this.state.cart.cart_line_items[cartId] = event.target.value;
    //this.setState({quantity: event.target.value});
    updateCartItem(lineItemId, event.target.value)
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
                  <h3>Price: ${cartItem.product.price}</h3>
                  <h3>Quantity: 
                  <input type="number" id="quantity" name="quantity" value={cartItem.quantity} min="1" max="10" onChange={(event) => onInputChange(event,cartItem.id )}></input>
                  </h3>
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
      <div>
      <h2>No items in the cart, go shop!</h2>
    </div>

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
      updateCartItem: (cartLineId, quantity)=> 
        dispatch(updateCartItem(cartLineId, quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
