/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { Nav } from 'react-bootstrap';
import './styles/Login.css';

import { loginUser } from '../store/storeComponents/loginUser';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  async onSubmit(ev) {
    try {
      ev.preventDefault();
      this.props.loginUser(this.state);
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { onChange, onSubmit } = this;
    const { email, password } = this.state;
    return (
      <div id='login-container'>
        <h2> Login </h2>
        <form onSubmit={onSubmit} autoComplete='off'>
          <TextField
            id='standard-basic'
            label='Email'
            value={email}
            onChange={onChange}
            name='email'
            type='email'
            autoComplete='email'
          />
          <TextField
            id='standard-adornment-password'
            label='Password'
            value={password}
            onChange={onChange}
            name='password'
            type='password'
            autoComplete='current-password'
          />

          <Button
            variant='contained'
            type='submit'
            color='secondary'
            style={{ marginTop: '1rem' }}
          >
            Login
          </Button>
        </form>

        <Nav.Link href='#ForgotPassword'>Forgot your password?</Nav.Link>

        <a className='nav-link' href='#/Signup'>
          Create an account
        </a>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
