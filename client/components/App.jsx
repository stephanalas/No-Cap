import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';
import './styles/App.css';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Route path='/'>
          <NavBar />
          <div id='welcome-message'>Welcome To Box Jumpers</div>
        </Route>
      </HashRouter>
    );
  }
}

export default App;
