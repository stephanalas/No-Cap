/* eslint jsx-quotes: "off" */

import React from 'react';
import { connect } from 'react-redux';
import faker from 'faker';
import { createUser } from '../store/storeComponents/createUser';
import { loadCart } from '../store/storeComponents/loadCart';
import { getUser } from '../store/storeComponents/getUser';

class CreateAnonUser extends React.Component {
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
    } else if (token) {
      this.props.getUser();
      console.log('get user called in creatanonuser');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.loadCart(this.props.user.id);
    }
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => {
      dispatch(createUser(user));
    },
    getUser: () => {
      dispatch(getUser());
    },
    loadCart: (userId) => {
      dispatch(loadCart(userId));
    },
  };
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapDispatchToProps)(CreateAnonUser);
