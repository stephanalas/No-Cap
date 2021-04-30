/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from 'react';
import axios from 'axios';
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
      const { email, password } = this.state;
      //comment
      // thunk needed for submit
      const message = (await axios.post('/api/login', this.state)).data;
      console.log(message);
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { onChange, onSubmit } = this;
    const { email, password } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={onChange} name="email" />
        <label htmlFor="password">Password</label>
        <input value={password} onChange={onChange} name="password" />
        <button type="submit">Login In</button>
      </form>
    );
  }
}
export default Login;
