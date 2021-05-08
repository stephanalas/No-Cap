/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import CartLineItem from './CartLineItem';
import './styles/Cart.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { loadCart } from '../store/storeComponents/loadCart';
import 'react-toastify/dist/ReactToastify.css';
import { removeCartItem } from '../store/storeComponents/removeCartItem';
import { updateCartItem } from '../store/storeComponents/updateCartItem';
import { getUser } from '../store/storeComponents/getUser';
import { clearCart } from '../store/storeComponents/clearCart';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell } from './utils/styledTableCell';
import getToken from './utils/getToken';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: {},
      cartTotal: 0,
      totalAmt: 0,
      user: {},
    };
    this.handleToken = this.handleToken.bind(this);
  }

  async componentDidMount() {
    try {
      this.props.getUser();
      this.props.loadCart(this.props.user.id);
      this.setState({
        ...this.state,
        cartTotal: this.props.cart.total,
        user: this.props.user,
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cart.total !== this.props.cart.total) {
      this.setState({
        cartTotal: this.props.cart.total,
        cart: this.props.cart,
        totalAmt: this.props.cart.cart_line_items.length,
      });
    }

    if (this.props.user !== this.state.user) {
      this.setState({
        ...this.state,
        user: this.props.user,
      });
    }

    if (prevState.cart.id !== this.props.cart.id) {
      this.props.getUser();
      this.setState({
        cart: this.props.cart,
        totalAmt: this.props.cart.cart_line_items.length,
      });
    }
  }

  async handleToken(token, addresses) {
    try {
      const { cartTotal } = this.state;
      const items = this.props.cart.cart_line_items;
      const user = this.props.user;
      console.log(getToken(), 'in cart component handle token');
      const response = await axios.post(
        '/api/orders/checkout',
        {
          token,
          addresses,
          cartTotal,
        },
        getToken()
      );
      const status = response.data;
      if (status === 'success') {
        toast('Your order went through! Check email for details.', {
          type: 'success',
        });
        await axios.post(
          `/api/orders/users/${this.props.user.id}`,
          { items, user },
          getToken()
        );
        this.props.clearCart();
      } else {
        toast('There was an error placing your order. Please try again.', {
          type: 'error',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { cart_line_items } = this.state.cart;
    const { totalAmt, cartTotal } = this.state;

    return cart_line_items ? (
      <div>
        <TableContainer component={Paper} style={{ height: 600 }}>
          <ToastContainer />

          <Table aria-label='spanning table'>
            <TableHead>
              <TableRow>
                <StyledTableCell colSpan={6} align='center'>
                  Cart <span className='cart-amt'>{totalAmt}</span>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell colSpan={2} align='center'>
                  Product
                </StyledTableCell>
                <StyledTableCell align='center'>Price</StyledTableCell>
                <StyledTableCell align='center'>Quantity</StyledTableCell>
                <StyledTableCell align='center'>SubTotal</StyledTableCell>
                <StyledTableCell align='center'>Remove</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart_line_items.map((cartItem) => (
                <CartLineItem
                  key={cartItem.id}
                  cartLineItem={cartItem}
                  cartTotal={cartTotal}
                />
              ))}
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ width: 900 }} align='right'>
                  Total:
                </StyledTableCell>
                <StyledTableCell align='right'>
                  ${cartTotal.toFixed(2)}
                </StyledTableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <StripeCheckout
          stripeKey='pk_test_51ImrllFdJ30zvHzoB68wryuf9eFrZxnuVWhUaUW0eFCvTMB0MQFZIqpZG7h3E6la7LCbjV85MN95VUotf1eQEEVW00XYb4Fuop'
          token={this.handleToken}
          billingAddress
          shippingAddress
          amount={this.state.cartTotal * 100}
          name='NoCap Order'
        />
      </div>
    ) : (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId) => dispatch(loadCart(userId)),
    removeCartItem: (cartId, lineId) =>
      dispatch(removeCartItem(cartId, lineId)),
    updateCartItem: (cartLineId, quantity, cartId, userId) =>
      dispatch(updateCartItem(cartLineId, quantity, cartId, userId)),
    getUser: () => dispatch(getUser()),
    clearCart: () => dispatch(clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);