/* eslint jsx-quotes: "off" */

import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import faker from 'faker';
import NavBar from './NavBar';
import './styles/App.css';
import Login from './Login';
import Register from './Register';
import AllProducts from './AllProducts';
import SingleProduct from './SingleProduct';
import Filter from './Filter';
import { createUser } from '../store/storeComponents/createUser';
import {loadCart} from '../store/storeComponents/loadCart';
import Logout from './Logout';
import Admin from './Admin';
import Cart from './Cart';
import axios from 'axios';

import Logout from './Logout';

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
    //this.props.loadCart()
    console.log(this.props);
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.user.id !== this.props.user.id){ 
      this.props.loadCart(this.props.user.id)
    }
  }

  render() {
    return (
      <HashRouter>
        <Route component={NavBar} />
        <Route path="/Admin" component={Admin} exact />
        <Route path="/test" component={Filter} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/Logout" component={Logout} exact />
        <Route path="/Products" component={AllProducts} exact />
        <Route path="/Products/:id" component={SingleProduct} exact />
        <Route path="/ShoppingCart" component={Cart} exact />
      </HashRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => {
      dispatch(createUser(user));
    },
    loadCart: (userId) => {
      dispatch(loadCart(userId));
    }
  };
};

export default connect((state)=> state, mapDispatchToProps)(App);
