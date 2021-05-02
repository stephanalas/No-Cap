import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/Admin.css';
import AllUsers from './AllUsers';
import authentication from './utils/authentication';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'users',
      role: '',
    };
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  async componentDidMount() {
    const token = window.localStorage.getItem('token');
    const role = await authentication(token);
    const oldState = this.state;
    this.setState({ ...oldState, role });
  }

  changeDisplay(display) {
    this.setState({ display });
  }

  render() {
    const { role } = this.state;
    return role === 'Admin' ? (
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
    ) : (
      ''
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     authentication: (token) => dispatch(authentication(token)),
//   };
// };

export default connect(null, null)(Admin);
