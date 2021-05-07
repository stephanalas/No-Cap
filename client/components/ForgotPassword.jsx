/* eslint jsx-quotes: "off" */
/* eslint no-console: "off" */

import React from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

// code source/inspiration:
// https://github.com/paigen11/mysql-registration-passport
// https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7

class ForgotPassword extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
    };

    this.onChange = this.onChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  async onSubmit(ev) {
    ev.preventDefault();
    await this.sendEmail();
    console.log('submit button clicked');
  }

  async sendEmail() {
    if (this.state.email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
      });
    } else {
      try {
        const response = await axios.post('/api/support/forgotPassword', {
          email: this.state.email,
        });
        console.log('response data message', response);
        if (response.data.message === 'email not found') {
          this.setState({
            showError: true,
            messageFromServer: "We don't recognize that email...",
          });
        } else if (response.data.message === 'Recovery email sent!') {
          this.setState({
            showError: false,
            messageFromServer: 'Recovery email sent!',
          });
        }
      } catch (err) {
        console.log(err.data);
      }
    }
  }

  render() {
    const { onChange, onSubmit } = this;
    const { email, messageFromServer, showError } = this.state;

    return (
      <div>
        {messageFromServer ? `${messageFromServer}` : null}
        {showError ? `${messageFromServer}` : null}

        <form onSubmit={onSubmit} autoComplete='off'>
          <TextField
            id='email'
            required={true}
            label='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
          />
          <Button
            variant='contained'
            type='submit'
            color='primary'
            style={{ marginTop: '1rem' }}
          >
            Reset Password
          </Button>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
