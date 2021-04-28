/* eslint jsx-quotes: "off" */

import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
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
  onSubmit(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    // thunk needed for submit
  }
  render() {
    const { onChange, onSubmit } = this;
    const { email, password } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={onChange} name="username" />
        <label htmlFor="password">Password</label>
        <input value={password} onChange={onChange} name="password" />
        <button>Login In</button>
      </form>
    );
  }
}
export default Login;
