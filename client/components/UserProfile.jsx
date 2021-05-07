/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */
/* eslint object-curly-newline: "off" */

import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import './styles/Login.css';
import { updateUser } from '../store/storeComponents/updateUser';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      role: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { firstName, lastName, email, address, role, id } = this.props.user;
    this.setState({
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      address: address || '',
      password: '',
      role: role || '',
      id,
    });
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  async onSubmit(ev) {
    ev.preventDefault();
    this.props.updateUser({
      ...this.state,
    });
    this.props.history.push('/');
  }

  render() {
    const { onChange, onSubmit } = this;
    const { email, firstName, lastName, address, password } = this.state;

    return (
      <div id='login-container'>
        <h2>Edit Profile</h2>
        <form onSubmit={onSubmit} autoComplete='off'>
          <TextField
            id='standard-basic'
            required={true}
            label='First name'
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
          <TextField
            id='standard-basic'
            label='Address'
            value={address}
            onChange={onChange}
            name='address'
            type='text'
          />
          <Button
            variant='contained'
            type='submit'
            color='primary'
            style={{ marginTop: '1rem' }}
          >
            Save
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateUser(user));
    },
  };
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
