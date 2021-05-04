/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from 'react';
import { connect } from 'react-redux';
import './styles/Cart.css';
import { removeCartItem } from '../store/storeComponents/removeCartItem';
import { updateCartItem } from '../store/storeComponents/updateCartItem';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: {},
      cartTotal: 0,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }


  componentDidMount() {
    try {
        this.setState({ 
            ...this.state, 
            cart: this.props.cart, 
        });
    } catch (err) {
      console.log(err);
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if(this.props.cart.cart_line_items)
      if (prevProps.cart.cart_line_items.length !== this.props.cart.cart_line_items.length) {
          this.setState({ 
              cart: this.props.cart, 
          });
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
    const {removeCartItem} = this.props;
    const {onInputChange} = this;
    const { cart_line_items, id } = this.state.cart;
    const { cartTotal} = this.state;
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
                  <h3>Price: ${cartItem.product.price}</h3>
                  <h3>Quantity:
                  <input type="number" id="quantity" name="quantity" value={cartItem.quantity} min="1" max="10" onChange={(event) => onInputChange(event,cartItem.id )}></input>
                  </h3>
              
                  <h3>SubTotal: ${cartItem.subTotal}</h3>
                  <button id="delete" onClick={()=> removeCartItem(id, cartItem.id)}>Remove</button>
                </div>
              </div> 
            );
          })}
          <div className = "checkout">
            <h3>Cart Total: ${cartTotal}</h3>
            <button>Checkout</button>
          </div>
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
      cart: state.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCartItem: (cartId, lineId)=> dispatch(removeCartItem(cartId, lineId)),
    updateCartItem: (cartLineId, quantity)=> dispatch(updateCartItem(cartLineId, quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
