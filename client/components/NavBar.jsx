import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NavBar.css';

class NavBar extends React.Component {
  render() {
    return (
      <div className='nav'>
        <Link to='/Home'>Home</Link>
        <Link to='/Products'>Products</Link>
        <Link to='/Contact'>Contact Us</Link>
        <Link to='/Login'>Log In</Link>
        <Link to='/ShoppingCart'>Shopping Cart</Link>
      </div>
    );
  }
}

export default NavBar;
