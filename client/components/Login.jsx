/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { Nav } from 'react-bootstrap';
import { Redirect } from 'react-router';
import './styles/Login.css';

import { loginUser } from '../store/storeComponents/loginUser';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      success: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.error.message !== prevProps.error.message) {
      this.setState({
        loading: false,
        error: this.props.error.message,
        email: '',
        password: '',
        success: false,
      });
      console.log('error difference in CDU');
    }
    //   if (this.state.success !== prevState.success) {
    //     this.setState({
    //       loading: false,
    //       error: this.props.error.message,
    //       email: '',
    //       password: '',
    //     });
    //     console.log('success difference in CDU');
    //   }
    // }
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  async onSubmit(ev) {
    try {
      ev.preventDefault();
      this.setState({ loading: true });
      this.props.loginUser(this.state);
      setTimeout(() => {
        this.setState({ loading: false, success: true });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { onChange, onSubmit } = this;
    const { email, password, error, loading, success } = this.state;
    console.log('Error: ', error, 'Success: ', success);
    if (loading) {
      console.log('loading');
      return <h6>...Logging in</h6>;
    }
    if (!error && success) {
      console.log('redirecting...');
      return <Redirect to='/' />;
    }

    return (
      <div id='login-container'>
        <h2> Login </h2>
        {error && <h6>{error}</h6>}
        <form onSubmit={onSubmit} autoComplete='off'>
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
            name='password'
            type='password'
            autoComplete='current-password'
          />

          <Button
            variant='contained'
            type='submit'
            color='primary'
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

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
