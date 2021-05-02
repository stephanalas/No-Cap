/* eslint jsx-quotes: "off" */

import React from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import faker from "faker";
import NavBar from "./NavBar";
import "./styles/App.css";
import Login from "./Login";
import Register from "./Register";
import { createUser } from "../store/storeComponents/createUser";
import AllProducts from "./AllProducts";
import SingleProduct from "./SingleProduct";
import Logout from "./Logout";

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
    }
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/Logout" component={Logout} exact />
          <Route component={NavBar} />
        </Switch>
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/Products" component={AllProducts} exact />
        <Route path="/Products/:id" component={SingleProduct} exact />
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
