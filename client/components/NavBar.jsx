/* eslint jsx-quotes: "off" */

import React from 'react';
import { NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles/NavBar.css';
// import { connect } from 'react-redux';

class NavBar extends React.Component {
  render() {
    return (
      <div id="nav">
        <NavLink className="nav-link" to="/">
          <img
            id="logo"
            src="https://cdn.shopify.com/s/files/1/0085/4333/8543/products/NoCap.png?v=1584644511"
            alt="NoCap Logo"
          />
        </NavLink>
        <NavLink className="nav-link underline" to="/Products">
          Products
        </NavLink>
        <NavLink className="nav-link underline" to="/Contact">
          Contact Us
        </NavLink>
        {this.props.user.role && this.props.user.role !== 'Anonymous' ? (
          <NavLink className="nav-link underline" to="/Logout">
            Logout
          </NavLink>
        ) : (
          <NavLink className="nav-link underline" to="/Login">
            Log In
          </NavLink>
        )}
        {this.props.user.role && this.props.user.role === 'Admin' ? (
          <NavLink className="nav-link underline" to="/admin">
            Admin
          </NavLink>
        ) : (
          ''
        )}
        <NavLink className="nav-link underline" to="/ShoppingCart">
          Shopping Cart
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(NavBar);
// export default NavBar;
