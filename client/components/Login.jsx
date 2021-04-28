/* eslint jsx-quotes: "off" */

import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
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
    const { username, password } = this.state;
    this.props.signIn({
      username,
      password,
    });
  }
  render() {
    const { onChange, onSubmit } = this;
    const { username, password } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input value={username} onChange={onChange} name="username" />
        <label htmlFor="password">Password</label>
        <input value={password} onChange={onChange} name="password" />
        <button>Login In</button>
      </form>
    );
  }
}
export default Login;
