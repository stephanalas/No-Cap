/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */
/* eslint object-curly-newline: "off" */

import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import './styles/Login.css';
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
    this.props.history.push('/Products');
  }

  render() {
    const { onChange, onSubmit } = this;
    const { email, password, firstName, lastName } = this.state;
    return (
      <div id='login-container'>
        <h2> Sign Up! </h2>
        <form onSubmit={onSubmit} autoComplete='off'>
          <TextField
            id='standard-basic'
            label='First name'
            required={true}
            value={firstName}
            onChange={onChange}
            name='firstName'
            type='text'
          />
          <TextField
            id='standard-basic'
            required={true}
            label='Last name'
            value={lastName}
            onChange={onChange}
            name='lastName'
            type='text'
          />
          <TextField
            id='standard-basic'
            required={true}
            label='Email'
            value={email}
            onChange={onChange}
            name='email'
            type='email'
            autoComplete='email'
          />
          <TextField
            id='standard-adornment-password'
            required={true}
            label='Password'
            value={password}
            onChange={onChange}
            title="Password cannot contain special character '$'"
            name='password'
            type='password'
            autoComplete='new-password'
            pattern='^[^$]\d+'
          />
          <Button
            variant='contained'
            type='submit'
            color='primary'
            style={{ marginTop: '1rem' }}
          >
            Sign up
          </Button>
        </form>
        <a className='nav-link' href='#/Login'>
          Already have an account?
        </a>
      </div>
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
