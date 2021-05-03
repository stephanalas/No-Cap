/* eslint jsx-quotes: "off" */

import React from "react";
import { connect } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import faker from "faker";
import NavBar from "./NavBar";
import "./styles/App.css";
import Login from "./Login";
import Register from "./Register";
import AllProducts from "./AllProducts";
import SingleProduct from "./SingleProduct";
import Filter from "./Filter";
import LandingPage from './LandingPage';
import { createUser } from "../store/storeComponents/createUser";
import { loadCart } from "../store/storeComponents/loadCart";
import { getUser } from '../store/storeComponents/getUser';
import Logout from "./Logout";
import Admin from "./Admin";
import Cart from "./Cart";
import axios from "axios";


class App extends React.Component {
  componentDidMount() {
    const anonUser = {
      email: faker.internet.email(),
      firstName: "Anonymous",
      lastName: "User",
      password: faker.internet.password(),
    };
    const token = window.localStorage.getItem("token");
    if (!token) {
      this.props.createUser(anonUser);
    } else if (token) {
      this.props.getUser();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.loadCart(this.props.user.id);
    }
  }

  render() {
    return (
      <HashRouter>
        <Route component={NavBar} />
        <Route path='/' component={LandingPage} exact />
        {this.props.user.role && this.props.user.role === 'Admin' ? (
          <Route path='/Admin' component={Admin} exact />
        ) : null}
        <Route path='/test' component={Filter} exact />
        {this.props.user.role && this.props.user.role === 'Anonymous' ? (
          <Route path='/Signup' component={Register} exact />
        ) : null}
        {this.props.user.role && this.props.user.role !== 'Anonymous' ? (
          <Route path='/Logout' component={Logout} exact />
        ) : (
          <Route path='/login' component={Login} exact />
        )}

        <Route path='/Products' component={AllProducts} exact />
        <Route path='/Products/:id' component={SingleProduct} exact />
        <Route path='/ShoppingCart' component={Cart} exact />
      </HashRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => {
      dispatch(createUser(user));
    },
    getUser: () => {
      dispatch(getUser());
    },
    loadCart: (userId) => {
      dispatch(loadCart(userId));
    },
  };
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapDispatchToProps)(App);
