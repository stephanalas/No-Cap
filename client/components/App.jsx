import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Route path="/">
          <NavBar />
          <div style={{ display: 'flex', justifyContent: 'center' }}>Welcome To Box Jumpers</div>
        </Route>
      </HashRouter>
    );
  }
}

export default App;
