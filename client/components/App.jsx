/* eslint jsx-quotes: "off" */

import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';
import './styles/App.css';
import Login from './Login';
class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Route path="/">
          <NavBar />
          <div id="welcome-message">Welcome To Box Jumpers</div>
        </Route>
        <Route path="/login" component={Login} exact />
      </HashRouter>
    );
  }
}

export default App;
