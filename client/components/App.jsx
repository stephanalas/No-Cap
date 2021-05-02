/* eslint jsx-quotes: "off" */

import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import faker from 'faker';
import NavBar from './NavBar';
import './styles/App.css';
import Login from './Login';
import Register from './Register';
import { createUser } from '../store/storeComponents/createUser';
import AllProducts from './AllProducts';
import SingleProduct from './SingleProduct';
import Admin from './Admin';
import Cart from './Cart';

class App extends React.Component {
  componentDidMount() {
    const anonUser = {
      email: faker.internet.email(),
      firstName: 'Anonymous',
      lastName: 'User',
      password: faker.internet.password(),
    };
    const token = window.localStorage.getItem('token');
    if (!token) {
      this.props.createUser(anonUser);
    }
  }

  render() {
    return (
      <HashRouter>
        <Route component={NavBar} />
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/Products" component={AllProducts} exact />
        <Route path="/Products/:id" component={SingleProduct} exact />
        <Route path="/ShoppingCart" component={Cart} exact />
        <Route path="/Admin" component={Admin} exact />
      </HashRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => {
      dispatch(createUser(user));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
