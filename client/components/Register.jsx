/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */
/* eslint object-curly-newline: "off" */

import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../store/storeComponents/registerUser';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'User',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  async onSubmit(ev) {
    ev.preventDefault();
    this.props.registerUser({
      ...this.state,
      anonUser: this.props.user.id,
    });
    this.props.history.push('/login');
  }

  render() {
    const { onChange, onSubmit } = this;
    const { email, password, firstName, lastName } = this.state;
    return (
      <form method="POST" onSubmit={onSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input value={firstName} onChange={onChange} name="firstName" />
        <label htmlFor="lastname">Last Name</label>
        <input value={lastName} onChange={onChange} name="lastName" />
        <label htmlFor="email">Email</label>
        <input value={email} onChange={onChange} name="email" />
        <label htmlFor="password">Password</label>
        <input
          title="Password cannot contain special character '$'"
          value={password}
          pattern="^[^$]\d+"
          onChange={onChange}
          name="password"
        />
        <button type="submit">Register</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (user) => {
      dispatch(registerUser(user));
    },
  };
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
