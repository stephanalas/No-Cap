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
        <NavLink className="nav-link underline" to="/Home">
          Home
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
        <NavLink className="nav-link underline" to="/register">
          Register
        </NavLink>
        <NavLink className="nav-link underline" to="/admin">
          Admin
        </NavLink>
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
