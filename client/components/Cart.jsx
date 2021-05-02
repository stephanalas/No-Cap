/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from "react";
import { connect } from "react-redux";
import "./styles/Cart.css";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      cartTotal: "",
    };
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

  render() {
    const { cart_line_items } = this.props.cart;
    return cart_line_items ? (
      <div>
        <div>Cart</div>
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
                  <button id="delete">Remove</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      "Loading"
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

//export default connect(null, mapDispatchToProps)(Cart)
export default connect(mapStateToProps)(Cart);
