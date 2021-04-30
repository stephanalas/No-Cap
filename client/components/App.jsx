/* eslint jsx-quotes: "off" */

import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';
import './styles/App.css';
import Login from './Login';
import Register from './Register';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Route component={NavBar} />
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
      </HashRouter>
    );
  }
}

export default App;
