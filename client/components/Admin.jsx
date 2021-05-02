import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/Admin.css';
import AllUsers from './AllUsers';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'users',
    };
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(display) {
    this.setState({ display });
  }

  render() {
    return (
      <div>
        <div className="multi-button">
          <button type="button" onClick={() => this.changeDisplay('users')}>
            All Users
          </button>
          <button type="button" onClick={() => this.changeDisplay('orders')}>
            All Orders
          </button>
        </div>
        <div>
          {this.state.display === 'users' ? <AllUsers /> : <li>Potato</li>}
        </div>
      </div>
    );
  }
}

export default connect(null)(Admin);
