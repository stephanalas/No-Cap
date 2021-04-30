/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
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
    ev.preventDefault();
    // thunk needed for submit
    await axios.post('/api/register', this.state);
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
        <input value={password} onChange={onChange} name="password" />
        <button type="submit">Register</button>
      </form>
    );
  }
}
export default Register;
